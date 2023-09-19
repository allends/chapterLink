import { For, Show, createEffect, createMemo, createSignal, onMount } from "solid-js"
import { getAllEvents, getSemesters, getUserAttendenceRequests, pbStore, requestEvent } from "~/service"
import { OcLocation2 } from 'solid-icons/oc'
import { VsOrganization } from 'solid-icons/vs'
import { BiRegularCoin } from 'solid-icons/bi'
import { AiOutlineCalendar, AiOutlinePlus } from 'solid-icons/ai'
import { AttendenceRequest, Event, User } from "~/types"
import { parseDate } from "~/utils/date"

export default function events() {

  const [events, setEvents] = createSignal<Event[]>([])
  const [semesters, setSemesters] = createSignal<string[]>([])
  const [selectedSemester, setSelectedSemester] = createSignal<string>("All")
  const [selectedEvent, setSelectedEvent] = createSignal<Event | null>(null)
  const [userRequests, setUserRequests] = createSignal<AttendenceRequest[] | undefined>()

  const eventAttended = (eid: string) => {
    return userRequests()?.some(request => request.event === selectedEvent()?.id)
  }

  const onRequestEvent = () => {
    console.log(pbStore.user?.id!, " + ", selectedEvent()?.id!)
    requestEvent(pbStore.user?.id!, selectedEvent()?.id!).then(() => {
      getUserAttendenceRequests().then(s => setUserRequests(s))
    })
  }

  onMount(async () => {
    getAllEvents().then(e => setEvents(e)).then(() => setSelectedEvent(events()[0]))
    getSemesters().then(s => setSemesters(s))
    getUserAttendenceRequests().then(s => setUserRequests(s))
  })

  createEffect(() => {
    console.log(userRequests())
  }, [userRequests()])

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
          <select class="select outline" onChange={e => setSelectedSemester(e.target.value)}>
            <option>All</option>
            <For each={semesters()}>
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
          <For each={events().filter(event => selectedSemester() === event.semester || selectedSemester() === "All")} fallback={<div>no users</div>}>
            {(item, index) => (
            <li
              onClick={() => setSelectedEvent(item)}
            >
              <a>{item.name}</a>
            </li>
            )}
          </For>
        </ul>
        </div>
      <Show when={selectedEvent() !== null} fallback={<div class="text-center mx-auto text-lg">No event selected.</div>}>
        <div class="w-3/4">
          <div class="card shadow-xl outline">
              <div class="card-body">
                <div class="flex flex-row justify-between items-center w-full">
                  <h2 class="card-title">{selectedEvent()?.name} {(eventAttended(selectedEvent()?.id ?? "")) && "- Attending"}</h2>
                  <button class="btn btn-outline" disabled={eventAttended(selectedEvent()?.id ?? "")} onClick={onRequestEvent}>
                    {
                      eventAttended(selectedEvent()?.id ?? "") ? "I'm going" : "I'll go"
                    }
                  </button>
                </div>
                <div class="flex flex-row items-center gap-2">
                  <AiOutlineCalendar class="fill-primary-content" />
                  <h3>{(new Date(selectedEvent()?.date ?? "")).toDateString()}</h3>
                </div>
                <div class="flex flex-row items-center gap-2">
                  <OcLocation2 class="fill-primary-content" />
                  <h3>{selectedEvent()?.location}</h3>
                </div>
                <div class="flex flex-row items-center gap-2">
                  <VsOrganization class="fill-primary-content" />
                  <h3>{selectedEvent()?.expand?.organizers?.map(org => `${org.first} (${org.number})`).join(", ")}</h3>
                </div>
                <div class="flex flex-row items-center gap-2">
                  <BiRegularCoin class="fill-primary-content" />
                  <h3>{selectedEvent()?.value} {selectedEvent()?.category} points</h3>
                </div>
                <p class="p-4">{selectedEvent()?.description ?? "N/A"}</p>
              </div>
          </div>
          <div class="overflow-x-auto">
        </div>
        </div>
      </Show>
      </div>
  </main>
  )
}
