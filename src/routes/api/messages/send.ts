import { type APIEvent, json } from "solid-start";

export async function GET({ params }: APIEvent) {
  return json({ hello: "world" })
}