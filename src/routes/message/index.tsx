import { createSignal } from "solid-js"
import { sendMessage } from "~/service"

export default function Message() {

  const [message, setMessage] = createSignal("")

  return (
    <div class="prose flex flex-col items-center mx-auto">
      <h1 class="my-3">Message</h1>
      <input type="text"
        placeholder="message"
        class="input input-bordered w-full max-w-xs"
        value={message()}
        onChange={(e) => {
          setMessage(e.target.value)
        }}
      />
      <button class="btn" onClick={() => {
        console.log(message())
        sendMessage(message())
      }}>Send</button>
    </div>
  )
}
