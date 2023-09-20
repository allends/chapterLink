import { For, Show, createSignal, onMount } from "solid-js";
import { UserCard } from "~/components/UserCard";
import { getUsers } from "~/service";
import { User } from "~/types";
import { createRequest } from "~/utils/createRequest";

export const createUsersState = () => {
  const userRequest = createRequest(getUsers)
  const [selectedUser, setSelectedUser] = createSignal<User | undefined>(undefined)

  return {
    users: userRequest.data,
    usersLoading: userRequest.loading,
    usersError: userRequest.error,
    selectedUser,
    setSelectedUser
  }
}

export default function users() {

  const _S = createUsersState()

  return (
    <main class="text-center mx-auto p-4">
      <div class="font-bold text-3xl">
        Users
      </div>
      <div class="my-4 font-medium text-lg">{_S.selectedUser()?.first ?? "- "}</div>
      <div class="flex flex-row  gap-3">
        <div class="flex flex-col gap-5">
          <div class="flex flex-row justify-between items-baseline">
            <div class="font-bold text-xl">
              Users
            </div>
          </div>
          <ul class="menu bg-base-200 w-56 rounded-box">
            <For each={_S.users()} fallback={<div>no users</div>}>
              {(item, index) => (
                <li
                  onClick={() => _S.setSelectedUser(item)}
                >
                  <a> {item.first} </a>
                </li>
              )}
            </For>
          </ul>
        </div>
        <Show when={_S.selectedUser()} fallback={<div class="text-center mx-auto text-lg">No user selected.</div>}>
          <UserCard user={_S.selectedUser()!} />
        </Show>
      </div>
    </main>
  );
}
