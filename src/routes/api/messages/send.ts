import PocketBase from 'pocketbase'
import { type APIEvent, json } from "solid-start";
import { pbStore } from '~/service';
import { User } from '~/types';

const pb = new PocketBase(import.meta.env.VITE_DB)

export async function GET({ params }: APIEvent) {
  console.log(params)
  return json({ hello: "world" })
}

export async function POST(event: APIEvent) {
  try {
    const json_resp = await event.request.json()
    const cookie = event.request.headers.get("Auth")
    console.log(cookie)
    pb.authStore.loadFromCookie(cookie ?? "", "pb_auth")
    return json({ user: pb.authStore.model?.email})
  } catch (e) {
    console.log(e)
  }
  // pb.authStore.loadFromCookie(event.request.headers)
  // console.log(pb.authStore.isValid)
  return json({ hello: 'world' })
}