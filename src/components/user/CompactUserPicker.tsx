import { TiDeleteOutline } from "solid-icons/ti"
import { createSignal, createMemo, For, Switch, Match, createEffect } from "solid-js"
import { User } from "~/types"
import { createSelectableList } from "~/utils/createSelectable"
import { UserCard } from "./UserCard"

export function CompactUserPicker(props: { users: User[], selected: User[], addUser: (user: User) => void, removeUser: (user: User) => void }) {

  const [searchTerm, setSearchTerm] = createSignal<string>("")
  const [activeTab, setActiveTab] = createSignal<number>(0)
  const isSelected = (user: User) => props.selected.find(u => u.id === user.id)
  const filteredUsers = createMemo(() => {
    return props.users.filter(u => !isSelected(u) && (searchTerm().trim() === "" || `${u.first} ${u.last}`.toLowerCase().includes(searchTerm().toLowerCase())))
  }, [props.users, props.selected])

  const toggleUser = (user: User) => {
    if (isSelected(user)) {
      props.removeUser(user)
    } else {
      setSearchTerm("")
      props.addUser(user)
    }
  }

  return (
    <dialog id="my_modal_3" class="modal">
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg mb-3">Select users</h3>
        <input
          type="text"
          placeholder="Search"
          class="input input-md input-bordered w-full"
          value={searchTerm()}
          onKeyUp={e => setSearchTerm((e.target as any).value)}
        />
        <div class="tabs tabs-boxed max-w-fit mx-auto m-5">
          <a class={`tab ${activeTab() == 0 && 'tab-active'}`} onClick={() => setActiveTab(0)}>Search</a>
          <a class={`tab ${activeTab() == 1 && 'tab-active'}`} onClick={() => setActiveTab(1)}>Selected</a>
        </div>
        <Switch fallback={<div>Not Implemented... yet</div>}>
          <Match when={activeTab() == 0}>
            <div class="flex flex-col gap-1 h-72 overflow-y-auto">
              <For each={filteredUsers()}>
                {(item) => <UserCard user={item} onClick={() => toggleUser(item)} compact />}
              </For>
            </div>
          </Match>
          <Match when={activeTab() == 1}>
            <div class="flex flex-col gap-1 h-72 overflow-y-auto">
              <For each={props.selected}>
                {(item) => <UserCard user={item} onClick={() => toggleUser(item)} compact />}
              </For>
            </div>
          </Match>
        </Switch>
        <div class="modal-action">
          <button class="btn btn-accent">Done</button>
        </div>
      </form>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>)
}