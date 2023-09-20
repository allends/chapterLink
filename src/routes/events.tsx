import { For, Show, createEffect, createSignal } from "solid-js"
import { getAllEvents, getSemesters, getUserAttendenceRequests, pbStore, requestEvent, unrequestEvent } from "~/service"
import { OcLocation2 } from 'solid-icons/oc'
import { VsOrganization } from 'solid-icons/vs'
import { BiRegularCoin } from 'solid-icons/bi'
import { AiOutlineCalendar, AiOutlinePlus } from 'solid-icons/ai'
import { Event } from "~/types"
import { createRequest } from "~/utils/createRequest"

export const EventCard = (props: {
  event: Event,
  attended: boolean,
  onRequestEvent: () => void,
  onRejectEvent: () => void,
}) => {

  return (
    <div class="w-3/4">
      <div class="card shadow-xl outline">
        <div class="card-body">
          <div class="flex flex-row justify-between items-center w-full">
            <h2 class="card-title">{props.event.name} {props.attended && "- Attending"}</h2>
            <div class="flex flex-row gap-5">
            <Show when={props.attended}>
              <button class="btn btn-error" onClick={props.onRejectEvent}>
                Nevermind
              </button>
            </Show>
            <button class="btn btn-outline" disabled={props.attended} onClick={props.onRequestEvent}>
              {
                props.attended ? "I'm going" : "I'll go"
              }
            </button>
            </div>
          </div>
          <div class="flex flex-row items-center gap-2">
            <AiOutlineCalendar class="fill-primary-content" />
            <h3>{(new Date(props.event.date)).toDateString()}</h3>
          </div>
          <div class="flex flex-row items-center gap-2">
            <OcLocation2 class="fill-primary-content" />
            <h3>{props.event.location}</h3>
          </div>
          <div class="flex flex-row items-center gap-2">
            <VsOrganization class="fill-primary-content" />
            <h3>{props.event.expand?.organizers?.map(org => `${org.first} (${org.number})`).join(", ")}</h3>
          </div>
          <div class="flex flex-row items-center gap-2">
            <BiRegularCoin class="fill-primary-content" />
            <h3>{props.event.value} {props.event.category} points</h3>
          </div>
          <p class="p-4">{props.event.description ?? "N/A"}</p>
        </div>
      </div>
      <div class="overflow-x-auto">
      </div>
    </div>
  )
}

const createEventState = () => {
  const eventsRequest = createRequest(getAllEvents)
  const semestersRequest = createRequest(getSemesters)
  const userAttendanceRequest = createRequest(getUserAttendenceRequests)
  const [selectedEvent, setSelectedEvent] = createSignal<Event | undefined>()
  const [selectedSemester, setSelectedSemester] = createSignal<string>("All")

  const eventAttended = () => {
    return userAttendanceRequest.data()?.some(request => request.event === selectedEvent()?.id) || false
  }

  const onEventRequest = () => {
    requestEvent(pbStore.user?.id!, selectedEvent()?.id!).then(() => {
      userAttendanceRequest.fetch()
    })
  }

  const onEventReject = () => {
    unrequestEvent(pbStore.user?.id!, selectedEvent()?.id!).then(() => {
      userAttendanceRequest.fetch()
    })
  }

  createEffect(() => {
    console.log(selectedEvent)
  }, [selectedEvent])

  return {
    eventsRequest,
    semestersRequest,
    userAttendanceRequest,
    selectedEvent,
    setSelectedEvent,
    eventAttended,
    selectedSemester,
    setSelectedSemester,
    onEventRequest,
    onEventReject
  }
}

export default function events() {

  const _S = createEventState()

  return (
    <main class="text-center mx-auto p-4">
      <div class="font-bold text-3xl mb-5">
        Events
      </div>
      <div class="flex flex-row  gap-3">
        <div class="flex flex-col gap-5">
          <div class="flex flex-row justify-between items-baseline">
            <div class="font-bold text-xl">
              Events
            </div>
            <select class="select outline" onChange={e => _S.setSelectedSemester(e.target.value)}>
              <option>All</option>
              <For each={_S.semestersRequest.data()}>
                {sem => (
                  <option>
                    {sem}
                  </option>
                )}
              </For>
            </select>
          </div>
          <ul class="menu bg-base-200 w-56 rounded-box">
            <Show when={pbStore.user?.permissions.includes("events")}>
              <li><a href="/newevent" class="flex flex-row items-center justify-between">New<AiOutlinePlus class="fill-primary-content" /></a></li>
            </Show>
            <For each={_S.eventsRequest.data()?.filter(event => _S.selectedSemester() === event.semester || _S.selectedSemester() === "All")} fallback={<div>no users</div>}>
              {(item, index) => (
                <li
                  onClick={() => _S.setSelectedEvent(item)}
                >
                  <a>{item.name}</a>
                </li>
              )}
            </For>
          </ul>
        </div>
        <Show when={_S.selectedEvent()} fallback={<div class="text-center mx-auto text-lg">No event selected.</div>}>
          <EventCard event={_S.selectedEvent()!} attended={_S.eventAttended()} onRequestEvent={_S.onEventRequest} onRejectEvent={_S.onEventReject} />
        </Show>
      </div>
    </main>
  )
}
