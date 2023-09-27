import { createEffect, createSignal } from "solid-js"
import { useRequest } from "solid-start/server"
import { UserPicker } from "~/components/user/UserPicker"
import { getUsers, sendMessage } from "~/service"
import { User } from "~/types"
import { createRequest } from "~/utils/createRequest"
import { createSelectableList } from "~/utils/createSelectable"

export default function Message() {

  const [message, setMessage] = createSignal("")
  const userRequest = createRequest(getUsers)

  const { selectedItems, addItem, removeItem, setItems, selectedIds } = createSelectableList([], (user: User) => user.id)

  createEffect(() => {
    setItems(userRequest.data() ?? [])
  })

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
      <UserPicker
        users={userRequest.data() ?? []}
        selected={selectedItems()}
        addUser={addItem}
        removeUser={removeItem}
      />
      <div class="flex flex-row gap-3 mt-2">
        <button class="btn btn-primary" onClick={() => { (window as any).my_modal_2.showModal() }}>Select users</button>
        <button class="btn" onClick={() => {
          console.log(message())
          sendMessage(message(), selectedIds())
        }}>Send</button>
      </div>
    </div>
  )
}
