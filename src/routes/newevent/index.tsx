import { For, Match, Show, createEffect, createMemo, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store"
import { createEvent, getUsers } from "~/service";
import { Semester, User } from "~/types";
import { createRequest } from "~/utils/createRequest";
import { UserPicker } from "~/components/user/UserPicker";
import { generateSemesterOptions, getCurrentSemester } from "~/utils/semester.util";

export const createEventState = () => {
  const options = ['Brotherhood', 'Scholarship', 'Professionalism', 'Community Service', 'Fundraising', 'Pledge']
  const userRequest = createRequest(getUsers)
  const semesters = generateSemesterOptions()
  const defaultSemester = getCurrentSemester()
  
  const [eventForm, setEventForm] = createStore<{
    name: string;
    value: number;
    date: string;
    category: string;
    semester: Semester;
    location: string;
    description: string;
    organizers: User[];
  }>({
    "name": "",
    "date": "",
    "category": "",
    "value": 1,
    "semester": defaultSemester,
    "location": "",
    "description": "",
    "organizers": []
  })

  const isSelected = (newUser: User) => {
    return eventForm.organizers.find(u => u.id === newUser.id)
  }

  const [searchTerm, setSearchTerm] = createSignal<string>("")

  const addUser = (newUser: User) => {
    if (eventForm.organizers.find(u => u.id === newUser.id)) return
    setEventForm("organizers", [...eventForm.organizers, newUser])
    setSearchTerm("")
  }

  const removeUser = (newUser: User) => {
    setEventForm("organizers", eventForm.organizers.filter(u => u.id !== newUser.id))
  }

  const submitEvent = () => {
    console.log(eventForm)
    createEvent(
      eventForm.name,
      eventForm.value,
      eventForm.date,
      eventForm.category,
      eventForm.semester,
      eventForm.location,
      eventForm.description,
      eventForm.organizers.map(o => o.id)
    ).then(resp => {
      if (resp.id) {
        setEventForm({
          "name": "",
          "date": "",
          "category": "",
          "value": 1,
          "semester": defaultSemester,
          "location": "",
          "description": "",
          "organizers": []
        })
        window.location.pathname = "/events"
      }
    }).catch(e => {
      alert("Please fill out the form correctly")
    })
  }

  return {
    options,
    eventForm,
    setEventForm,
    isSelected,
    userRequest,
    semesters: semesters.filter(sem => sem !== defaultSemester),
    defaultSemester,
    searchTerm, setSearchTerm,
    addUser,
    removeUser,
    submitEvent
  }
}

export default function newevent() {

  const _S = createEventState()

  return (
    <div class="flex flex-col mx-auto items-center gap-3 p-4 w-96">
      <div class="font-bold text-3xl mb-5">New Event</div>
      <input type="text"
        placeholder="Event name"
        class="input input-bordered w-full max-w-xs"
        value={_S.eventForm.name}
        onChange={(e) => {
          _S.setEventForm("name", e.target.value)
        }}
      />
      <div class="flex flex-row gap-3 w-full px-4">
        <select
          class="select select-bordered w-1/2"
          onChange={e => _S.setEventForm("category", e.target.value)}
        >
          <option disabled selected>category</option>
          <For each={_S.options}>
            {opt => (
              <option>{opt}</option>
            )}
          </For>
        </select>
        <input
          type="number"
          class="input input-bordered w-1/2"
          value={_S.eventForm.value}
          onChange={(e) => {
            _S.setEventForm("value", parseInt(e.target.value, 10))
          }}
        />
      </div>
      <div class="flex flex-row gap-3 w-full px-4">
        <select
          class="select select-bordered w-1/2"
          onChange={e => _S.setEventForm("semester", e.target.value as Semester)}
        >
          <option selected>{_S.defaultSemester}</option>
          <option disabled>---</option>
          <For each={_S.semesters}>
            {opt => (
              <option>{opt}</option>
            )}
          </For>
        </select>
        <input
          class="input input-bordered w-1/2"
          type="date" value={_S.eventForm.date}
          onChange={e => _S.setEventForm("date", e.target.value)}
        />
      </div>
      <input type="text"
        placeholder="Location"
        class="input input-bordered w-full max-w-xs"
        value={_S.eventForm.location}
        onChange={(e) => {
          _S.setEventForm("location", e.target.value)
        }}
      />
      <textarea
        placeholder="Description"
        class="textarea textarea-bordered w-full max-w-xs"
        value={_S.eventForm.description}
        onChange={(e) => {
          _S.setEventForm("description", e.target.value)
        }}
      />
      <input type="text"
        placeholder="Organizers"
        onClick={() => (window as any).my_modal_2.showModal()}
        class="input input-bordered w-full max-w-xs"
        value={_S.eventForm.organizers.map(org => `${org.first} ${org.last}`).join(", ")}
      />
      <button class="btn btn-primary" onClick={_S.submitEvent}>Create</button>
      <Show when={!_S.userRequest.loading() && _S.userRequest.data()}>
        <UserPicker users={_S.userRequest.data() || []} selected={_S.eventForm.organizers} addUser={_S.addUser} removeUser={_S.removeUser} />
      </Show>
    </div>
  )
}
