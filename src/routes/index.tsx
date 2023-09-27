import { For, Match, Show, Switch, createEffect, createMemo, createSignal, onMount } from "solid-js";
import { getUserEvents, getUserPoints, getUsers, pbStore } from "~/service";
import { createRequest } from "~/utils/createRequest";
import { parseDate } from "~/utils/date";
import { generateSemesterOptions, getCurrentSemester } from "~/utils/semester.util";

const createHomeState = () => {
  const userEventsRequest = createRequest(getUserEvents)
  const userPointsRequest = createRequest(getUserPoints)
  const semester = generateSemesterOptions()
  const defaultSemester = getCurrentSemester()

  return {
    semesters: semester.filter(sem => sem !== defaultSemester),
    defaultSemester,
    userEventsRequest,
    userPointsRequest,
  }
}

export default function Home() {

  const _S = createHomeState()
  const [activeTab, setActiveTab] = createSignal<number>(0)
  const [selectedSemester, setSelectedSemester] = createSignal<string>("All")

  return (
    <main class="text-center mx-auto p-4">
      <div class="font-bold text-3xl">
        {pbStore.user?.first}'s Dashboard
      </div>
      <div class="tabs tabs-boxed max-w-fit mx-auto m-5">
        <a class={`tab ${activeTab() == 0 && 'tab-active'}`} onClick={() => setActiveTab(0)}>Events</a>
        <a class={`tab ${activeTab() == 1 && 'tab-active'}`} onClick={() => setActiveTab(1)}>Points</a>
      </div>
      <Switch fallback={<div>Not Implemented... yet</div>}>
        <Match when={activeTab() == 0}>
          <div>
            <select class="select select-bordered" value={selectedSemester()} onChange={e => setSelectedSemester(e.target.value)}>
              <option selected>{_S.defaultSemester}</option>
              <option disabled>---</option>
              <option>All</option>
              <For each={_S.semesters}>
                {sem => (
                  <option>{sem}</option>
                )}
              </For>
            </select>
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                <For each={_S.userEventsRequest.data()?.filter((p) => p.semester === selectedSemester() || selectedSemester() === "All")}>
                  {(event) => (
                    <tr>
                      <td>{event.name}</td>
                      <td>{parseDate(event.date) ?? "No date"}</td>
                      <td>{event.category}</td>
                      <td>{event.value}</td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </Match>
        <Match when={activeTab() == 1}>
          <div>
            <select class="select select-bordered" value={selectedSemester()} onChange={e => setSelectedSemester(e.target.value)}>
              <option selected>{_S.defaultSemester}</option>
              <option disabled>---</option>
              <option>All</option>
              <For each={_S.semesters}>
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
              <For each={_S.userPointsRequest.data()?.filter((p) => p.semester === selectedSemester() || selectedSemester() === "All")}>
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
      </Switch>
    </main>
  );
}
