import { For, createEffect, createMemo, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store"
import { TiDeleteOutline } from 'solid-icons/ti'
import { createEvent, getSemesters, getUsers } from "~/service";
import { User } from "~/types";

function userPicker() {
  return (
    <div>
      user
    </div>
  )
}

export default function newevent() {

  const options = ['Brotherhood', 'Scholarship', 'Professionalism', 'Community Service', 'Fundraising', 'Pledge']
  const [ users, setUsers ] = createSignal([] as User[])
  const [ semester, setSemesters ] = createSignal<string[]>([])
  const [ searchTerm, setSearchTerm ] = createSignal<string>("")

  const isSelected= (newUser: User) => {
    return eventForm.organizers.find(u => u.id === newUser.id)
  }

  const addUser = (newUser: User) => {
    if (eventForm.organizers.find(u => u.id === newUser.id)) return
    setEventForm("organizers", [...eventForm.organizers, newUser])
    setSearchTerm("")
  }

  const removeUser = (newUser: User) => {
    setEventForm("organizers", eventForm.organizers.filter(u => u.id !== newUser.id))
  }

  const submitEvent = () => {
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
          "semester": "",
          "location": "",
          "description": "",
          "organizers": []
        })
      }
      }).catch(e => {
        alert("Please fill out the form correctly")
    })
  }

  const [eventForm, setEventForm] = createStore<{
    name: string;
    value: number;
    date: string;
    category: string;
    semester: string;
    location: string;
    description: string;
    organizers: User[];
  }>({
    "name": "",
    "date": "",
    "category": "",
    "value": 1,
    "semester": "",
    "location": "",
    "description": "",
    "organizers": []
  })

  onMount(() => {
    getUsers().then(u => {
      setUsers(u)
    })
    getSemesters().then(s => {
      setSemesters(s)
    })
  })

  return (
    <div class="flex flex-col mx-auto items-center gap-3 p-4 w-96">
      <div class="font-bold text-3xl mb-5">New Event</div>
      <input type="text"
        placeholder="Event name"
        class="input input-bordered w-full max-w-xs"
        value={eventForm.name}
        onChange={(e) => {
          setEventForm("name",e.target.value)
        }}
      />
      <div class="flex flex-row gap-3 w-full px-4">
        <select
          class="select select-bordered w-1/2"
          onChange={e => setEventForm("category", e.target.value)}
        >
          <option disabled selected>Category</option>
          <For each={options}>
            {opt => (
              <option>{opt}</option>
            )}
          </For>
        </select>
        <input
          type="number"
          class="input input-bordered w-1/2"
          value={eventForm.value}
          onChange={(e) => {
            setEventForm("value", parseInt(e.target.value, 10))
          }}
        />
      </div>
      <div class="flex flex-row gap-3 w-full px-4">
        <select
          class="select select-bordered w-1/2"
          onChange={e => setEventForm("semester", e.target.value)}
        >
          <option disabled selected>Semester</option>
          <For each={semester()}>
            {opt => (
              <option>{opt}</option>
            )}
          </For>
        </select>
        <input
          class="input input-bordered w-1/2"
          type="date" value={eventForm.date}
          onChange={e => setEventForm("date", e.target.value)}
        />
      </div>
      <input type="text"
        placeholder="Location"
        class="input input-bordered w-full max-w-xs"
        value={eventForm.location}
        onChange={(e) => {
          setEventForm("location",e.target.value)
        }}
      />
      <textarea 
        placeholder="Description"
        class="textarea textarea-bordered w-full max-w-xs"
        value={eventForm.description}
        onChange={(e) => {
          setEventForm("description",e.target.value)
        }}
      />
      <input type="text"
        placeholder="Organizers"
        onClick={() => (window as any).my_modal_2.showModal()}
        class="input input-bordered w-full max-w-xs"
        value={eventForm.organizers.map(org => `${org.first} ${org.last}`).join(", ")}
      />
      <button class="btn btn-primary" onClick={submitEvent}>Create</button>
      <dialog id="my_modal_2" class="modal">
        <form method="dialog" class="modal-box">
          <h3 class="font-bold text-lg mb-3">Select users</h3>
          <input
            type="text"
            placeholder="Search"
            class="input input-xs input-bordered w-56"
            value={searchTerm()}
            onKeyUp={e => setSearchTerm((e.target as any).value)}
          />
          <div class="flex flex-row">
            <div class="flex-1 text-left ml-5 my-2 text-xs">All:</div>
            <div class="flex-1 text-left ml-5 my-2 text-xs">Selected:</div>
          </div>
          <div class="flex flex-row gap-5">
            <ul class="menu bg-base-200 w-56 rounded-box h-96 overflow-y-auto flex-nowrap">
              <For each={users().filter(u => searchTerm().trim() === "" || `${u.first} ${u.last}`.toLowerCase().includes(searchTerm().toLowerCase()))}>
                {user => (
                  <li class={isSelected(user) && "disabled !cursor-pointer"} onClick={() => isSelected(user) ? removeUser(user) : addUser(user)}>
                    <a>{user.first} {user.last}</a>
                  </li>
                )}
              </For>
            </ul>
            <ul class="menu bg-base-200 w-56 rounded-box h-96 overflow-y-auto">
              <For each={eventForm.organizers}>
                {user => (
                  <li onClick={() => removeUser(user)}>
                    <a class="flex flex-row justify-between">
                      {user.first} {user.last}
                      <TiDeleteOutline class="fill fill-neutral-content" />
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </div>
          <div class="modal-action">
            <button class="btn btn-accent">Done</button>
          </div>
        </form>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}