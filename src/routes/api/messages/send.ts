import PocketBase from 'pocketbase'
import { type APIEvent, json, ErrorMessage } from "solid-start";
import { User } from '~/types';
import { Twilio } from 'twilio';

const pb = new PocketBase(import.meta.env.VITE_DB)

export async function GET({ params }: APIEvent) {
  console.log(params)
  return json({ hello: "world" })
}

enum default_variables {
  first,
  status,
}

export async function POST(event: APIEvent) {
  try {
    const request_json = await event.request.json()
    const cookie = event.request.headers.get("Auth")
    pb.authStore.loadFromCookie(cookie ?? "", "pb_auth")
    if (!pb.authStore.isValid) throw new Error("Not logged in")

    const user = await pb.collection("users").getOne<User>(pb.authStore.model?.id ?? "")
    if (!user.permissions.includes("messages")) throw new Error("Not authorized")

    const message = request_json.message
    const user_ids: string[] = request_json.users

    const users_list = await pb.collection("users").getFullList<User>()
    const users = users_list.filter(u => user_ids.includes(u.id))

    // create the messages
    const user_messages = users.map(u => {
      let message = request_json.message
      for (const key in default_variables) {
        if (!isNaN(Number(key))) continue
        message = message.replace(`@${key}`, u[key as keyof User])
      }
      return {
        message,
        ...u
      }
    })

    // create a client to send the messages
    const client = new Twilio(import.meta.env.VITE_TWILIO_SID, import.meta.env.VITE_TWILIO_AUTH_TOKEN)

    // send the messages
    for (const user_message of user_messages) {
      await client.messages.create({
        body: user_message.message,
        from: import.meta.env.VITE_TWILIO_NUMBER,
        to: user_message.number
      })
    }

    const names = users.map(u => u.first).join(", ")
    const numbers: string[] = users.map(u => u.number)
    return json({ message, names, numbers, status: "done" })
  } catch (e) {
    console.log(e)
  }

  // return an error
  return json({ error: "Something went wrong" }, 500)
}