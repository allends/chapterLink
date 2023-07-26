import PocketBase, { RecordAuthResponse } from 'pocketbase'
import { User, Event, Points } from './types'
import { createStore } from 'solid-js/store'

export const pb = new PocketBase("http://127.0.0.1:8090/")

export const [pbStore, setPbStore] = createStore<{
  pb: PocketBase,
  user: User | null
}>({
  "pb": pb,
  "user": null
})

export const subscribe = () => {
  pb.collection("users").subscribe<User>(pb.authStore.model?.id ?? "", (newUser) => {
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
   pb.authStore.clear()
}

export async function updateUser(venmo: string, number: string, birthday: string) {
   return await pb.collection("users").update(pb.authStore.model?.id ?? "", {
    venmo,
    number,
    birthday
   })
}

export async function getSemesters(): Promise<string[]> {
  const records = await pb.collection("semester").getFullList()
  return records.map(rec => rec.id)
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