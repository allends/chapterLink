import { For, Show, createEffect, createMemo, createSignal } from "solid-js"
import { getAllEvents, getUserAttendenceRequests, pbStore, requestEvent, unrequestEvent } from "~/service"
import { OcLocation2 } from 'solid-icons/oc'
import { VsOrganization } from 'solid-icons/vs'
import { BiSolidCoinStack } from 'solid-icons/bi'
import { AiOutlineCalendar, AiOutlinePlus } from 'solid-icons/ai'
import { Event } from "~/types"
import { createRequest } from "~/utils/createRequest"
import { generateSemesterOptions, getCurrentSemester } from "~/utils/semester.util"
import { useAuth } from "~/service/auth/AuthContext"

export const EventCard = (props: {
  event: Event,
  attended: boolean,
  requested: boolean,
  onRequestEvent: () => void,
  onRejectEvent: () => void,
}) => {

  return (
    <div class="w-full">
      <div class="card bg-base-200">
        <div class="card-body">
          <h2 class="card-title">{props.event.name} {props.attended && "- Attending"}</h2>
          <div class="flex flex-row items-center gap-2">
            <AiOutlineCalendar class="fill-primary" />
            <h3>{(new Date(props.event.date)).toDateString()}</h3>
          </div>
          <div class="flex flex-row items-center gap-2">
            <OcLocation2 class="fill-primary" />
            <h3>{props.event.location}</h3>
          </div>
          <div class="flex flex-row items-center gap-2">
            <VsOrganization class="fill-primary" />
            <h3>{props.event.expand?.organizers?.map(org => `${org.first} (${org.number})`).join(", ")}</h3>
          </div>
          <div class="flex flex-row items-center gap-2">
            <BiSolidCoinStack class="fill-primary" />
            <h3>{props.event.value} {props.event.category} points</h3>
          </div>
          <p class="mt-2 text-left">{props.event.description ?? "N/A"}</p>
        </div>
        <div class="card-actions justify-end mb-3 mr-3">
            <Show when={props.requested}>
              <button disabled={props.attended} class="btn btn-error" onClick={props.onRejectEvent}>
                Nevermind
              </button>
            </Show>
            <button class="btn btn-primary" disabled={props.requested || props.attended} onClick={props.onRequestEvent}>
              {
                props.attended ? "I'm going" : "I'll go"
              }
            </button>
        </div>
      </div>

    </div>
  )
}

const createEventState = () => {
  const eventsRequest = createRequest(getAllEvents)
  const userAttendanceRequest = createRequest(getUserAttendenceRequests)
  const semesters = generateSemesterOptions()
  const defaultSemester = getCurrentSemester()
  const [selectedEventId, setSelectedEventId] = createSignal<string | undefined>()
  const [selectedSemester, setSelectedSemester] = createSignal<string>("All")
  const { user } = useAuth()

  createEffect(() => {
    if (eventsRequest.data() && !selectedEventId()) {
      setSelectedEventId(eventsRequest.data()?.at(0)?.id)
    }
  })

  const selectedEvent = createMemo(() => {
    return eventsRequest.data()?.find(event => event.id === selectedEventId())
  })

  const eventAttended = () => {
    return selectedEvent()?.attendees.some(u => u === user().id) || false
  }

  const eventRequested = () => {
    return userAttendanceRequest.data()?.some(request => request.event === selectedEvent()?.id) || false
  }

  const onEventRequest = () => {
    requestEvent(user().id, selectedEvent()?.id!).then(() => {
      userAttendanceRequest.fetch()
    })
  }

  const onEventReject = () => {
    unrequestEvent(user().id!, selectedEvent()?.id!).then(() => {
      userAttendanceRequest.fetch()
    })
  }

  return {
    eventsRequest,
    semesters: semesters.filter(sem => sem !== defaultSemester),
    defaultSemester,
    userAttendanceRequest,
    selectedEvent,
    setSelectedEventId,
    eventAttended,
    eventRequested,
    selectedSemester,
    setSelectedSemester,
    onEventRequest,
    onEventReject,
    user
  }
}

export default function events() {

  const _S = createEventState()

  return (
    <main class="text-center mx-auto p-4">
      <div class="font-bold text-3xl mb-5">
        Events
      </div>
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-5">
          <div class="flex flex-row justify-between items-baseline">
            <div class="font-bold text-xl">
              Events
            </div>
            <select class="select outline" onChange={e => _S.setSelectedSemester(e.target.value)}>
              <option selected>{_S.defaultSemester}</option>
              <option disabled>---</option>
              <option>All</option>
              <For each={_S.semesters}>
                {opt => (
                  <option>{opt}</option>
                )}
              </For>
            </select>
          </div>
          <ul class="menu bg-base-200 rounded-box overflow-auto max-h-64 flex-nowrap">
            <Show when={_S.user().permissions.includes("events")}>
              <li><a href="/app/events/new" class="flex flex-row items-center justify-between">New<AiOutlinePlus class="fill-primary-content" /></a></li>
            </Show>
            <For each={_S.eventsRequest.data()?.filter(event => _S.selectedSemester() === event.semester || _S.selectedSemester() === "All")} fallback={<div>no events</div>}>
              {(item, index) => (
                <li
                  onClick={() => _S.setSelectedEventId(item.id)}
                >
                  <a>{item.name}</a>
                </li>
              )}
            </For>
          </ul>
        </div>
        <Show when={_S.selectedEvent()} fallback={<div class="text-center mx-auto text-lg">No event selected.</div>}>
          <EventCard event={_S.selectedEvent()!} attended={_S.eventAttended()} requested={_S.eventRequested()} onRequestEvent={_S.onEventRequest} onRejectEvent={_S.onEventReject} />
        </Show>
      </div>
    </main>
  )
}
