import { For, Match, Show, Switch, createEffect, createMemo, createSignal, onMount } from "solid-js";
import { Navigate } from "solid-start";
import { getSemesters, getUserEvents, getUserPoints, getUsers, pbStore } from "~/service";
import { User, Event, Points } from "~/types";
import { parseDate } from "~/utils/date";

export default function Home() {

  const [ activeTab, setActiveTab] = createSignal<number>(0)
  const [ events, setEvents ] = createSignal<Event[]>([] as Event[])
  const [ semesters, setSemesters ] = createSignal<string[]>([])
  const [ selectedSemester, setSelectedSemester ] = createSignal<string>("All")
  const [ points, setPoints ] = createSignal([] as Points[])

  onMount(async () => {
    getUserEvents().then((events) => setEvents(events))
    getUserPoints().then(p => setPoints(p))
    getSemesters().then(sem => setSemesters(sem)).then(() => setSelectedSemester(semesters()[0]))
  })

  return (
    <main class="text-center mx-auto p-4">
      <div class="font-bold text-3xl">
        {pbStore.user?.first}'s Dashboard 
      </div>
      <div class="tabs tabs-boxed max-w-fit mx-auto m-5">
        <a class={`tab ${activeTab() == 0 && 'tab-active'}`} onClick={() => setActiveTab(0)}>Points</a>
        <a class={`tab ${activeTab() == 1 && 'tab-active'}`} onClick={() => setActiveTab(1)}>Events</a>
        <a class={`tab ${activeTab() == 2 && 'tab-active'}`} onClick={() => setActiveTab(2)}>Position</a>
      </div>
      <Switch fallback={<div>Not Implemented... yet</div>}>
        <Match when={activeTab() == 0}>
          <div>
            <select class="select select-bordered" value={selectedSemester()} onChange={e => setSelectedSemester(e.target.value)}>
              <option selected>All</option>
              <For each={semesters()}>
                {sem => (
                  <option>{sem}</option>
                )}
              </For>
            </select>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>Semester</th>
                <th>Category</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              <For each={points().filter((p) => p.semester === selectedSemester() || selectedSemester() === "All")}>
                {(point) => (
                  <tr>
                    <td>{point.semester}</td>
                    <td>{point.category}</td>
                    <td>{point.points}</td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </Match>
        <Match when={activeTab() == 1}>
          <div class="flex flex-col">
            <div class="py-3">Attended Events</div>
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date/Semester</th>
                  <th>Category</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                <For each={events()}>
                  {(event) => (
                    <tr>
                      <td>{event.name}</td>
                      <td>{parseDate(event.date)} / {event.semester}</td>
                      <td>{event.category}</td>
                      <td>{event.value}</td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </Match>
      </Switch>
  </main>
  );
}
