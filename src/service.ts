import PocketBase, { RecordAuthResponse } from 'pocketbase'
import { User, Event, Points, AttendenceRequest } from './types'
import { createStore } from 'solid-js/store'
import { createSignal } from 'solid-js'

export const pb = new PocketBase(import.meta.env.VITE_DB)
export const [user, setUser] = createSignal<User | undefined>()

export const [pbStore, setPbStore] = createStore<{
  pb: PocketBase,
  user: User | null
}>({
  "pb": pb,
  "user": null
})

export const subscribe = () => {
  pb.collection("users").subscribe<User>(pb.authStore.model?.id ?? "", (newUser) => {
    setUser(newUser.record)
    setPbStore("user", newUser.record)
  })
}

export const unsubscribe = () => {
  pb.collection("users").unsubscribe(pb.authStore.model?.id)
}


export async function login(username: string, password: string): Promise<RecordAuthResponse<User>> {
  return await pb.collection('users').authWithPassword(`${username}@scarletmail.rutgers.edu`, password)
}

export function logout() {
  setUser()
  pb.authStore.clear()
}

export async function updateUser(venmo: string, number: string, birthday: string) {
   return await pb.collection("users").update(pb.authStore.model?.id ?? "", {
    venmo,
    number,
    birthday
   })
}

export async function getAllEvents(): Promise<Event[]> {
  const records = await pb.collection('events').getFullList<Event>({
    sort: '-date',
    expand: "attendees, organizers",
  });
  return records 
}

export async function getUserEvents(): Promise<Event[]> {
  const records = await pb.collection('events').getList<Event>(1, 50, {
    sort: "-date",
    filter: `attendees.id ?= "${pb.authStore.model?.id}"`
  })
  return records.items
}

export async function getUserPoints(): Promise<Points[]> {
  const records = await pb.collection('points').getList<Points>(1, 50, {
    sort: "-semester",
    filter: `id = "${pb.authStore.model?.id}"`
  })
  return records.items
}

export async function getEventsById(userId: string): Promise<Event[]> {
  const records = await pb.collection('events').getList<Event>(1, 50, {
    sort: "-date",
    filter: `attendees.id ?= "${userId}"`
  })
  return records.items
}

export async function getUsers(): Promise<User[]> {
  const records = await pb.collection('users').getFullList<User>({
    sort: '-created',
  });
  return records 
}

export async function createUser( username: string, first: string, last: string, password: string, passwordConfirm: string): Promise<User> {
  const newUser = await pb.collection('users').create<User>({
    username,
    "email": `${username}@scarletmail.rutgers.edu`,
    first,
    last,
    password, 
    passwordConfirm,
    "emailVisibility": true,
  })
  return newUser
}

export async function createEvent(name: string, value:number, date: string, category: string, semester: string, location: string, description: string, organizers: string[]) {
  const newEvent = await pb.collection('events').create<Event>({
    name,
    value,
    date,
    category,
    semester,
    location,
    description,
    organizers
  })
  return newEvent
}

export async function requestEvent(user: string, event: string) {
  const data = {
    user,
    event
  }
  const record = await pb.collection('attendence_requests').create<AttendenceRequest>(data)
  return record
}

export async function unrequestEvent(user: string, event: string) {
  const filter = `user="${user}" && event="${event}"`
  const record = await pb.collection('attendence_requests').getFirstListItem<AttendenceRequest>(filter)
  const deleted = await pb.collection('attendence_requests').delete(record.id)
  return deleted
}

export async function getAllAttendenceRequests() {
  const resultList = await pb.collection('attendence_requests').getFullList<AttendenceRequest>()
  return resultList
}

export async function getUserAttendenceRequests() {
  const records = await pb.collection('attendence_requests').getList<AttendenceRequest>(1, 50, {
    filter: `user="${pb.authStore.model?.id}"`
  })
  return records.items
}

export async function approveUserAttendenceRequest(request: AttendenceRequest) {
  // delete the user request
  const deleted = await pb.collection('attendence_requests').delete(request.id)
  if (!deleted) return
  
  // update the event to have the user in there now
  const event = await pb.collection('events').getOne<Event>(request.event)
  const data: Event = {
    ...event,
    attendees: [...event.attendees, request.user],
  }
  const updated = await pb.collection('events').update<Event>(event.id, data)
  return updated
}

export async function rejectUserAttendenceRequest(request: AttendenceRequest) {
  // delete the user request
  const deleted = await pb.collection('attendence_requests').delete(request.id)
  return
}

export async function sendMessage(message: string) {
  const cookie = pb.authStore.exportToCookie({ httpOnly: true })
  console.log(cookie)

  try {
    const resp = await fetch(import.meta.env.VITE_API + "messages/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Auth": cookie
      },
      body: JSON.stringify({
        message
      })
    })
    console.log(resp)
  } catch (e) {
    console.error(e)
  }
  
}