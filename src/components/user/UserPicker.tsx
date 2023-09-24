import { TiDeleteOutline } from "solid-icons/ti"
import { createSignal, createMemo, For } from "solid-js"
import { User } from "~/types"
import { createSelectableList } from "~/utils/createSelectable"

export function UserPicker(props: { users: User[], selected: User[], addUser: (user: User) => void, removeUser: (user: User) => void }) {

  const [searchTerm, setSearchTerm] = createSignal<string>("")
  const isSelected = (user: User) => props.selected.find(u => u.id === user.id)
  const filteredUsers = createMemo(() => {
    return props.users.filter(u => searchTerm().trim() === "" || `${u.first} ${u.last}`.toLowerCase().includes(searchTerm().toLowerCase()))
  }, [props.users])

  return (
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
              <For each={filteredUsers()}>
                {user => (
                  <li class={isSelected(user) && "disabled !cursor-pointer"} onClick={() => isSelected(user) ? props.removeUser(user) : props.addUser(user)}>
                    <a>{user.first} {user.last}</a>
                  </li>
                )}
              </For>
            </ul>
          <ul class="menu bg-base-200 w-56 rounded-box h-96 overflow-y-auto">
            <For each={props.selected}>
              {user => (
                <li onClick={() => props.removeUser(user)}>
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
    </dialog>)
}