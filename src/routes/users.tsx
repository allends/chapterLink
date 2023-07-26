import { For, Show, createSignal, onMount } from "solid-js";
import { getUsers } from "~/service";
import { User } from "~/types";

export default function users() {

  const [ users, setUsers ] = createSignal([] as User[])
  const [ selectedUser, setSelectedUser ] = createSignal<User | null>(null)

  onMount(async () => {
    const curUsers = await getUsers()
    setUsers(curUsers)
    console.log(users())
  })
  
  return (
    <main class="text-center mx-auto p-4">
      <div class="font-bold text-3xl">
        Users 
      </div>
      <div class="my-4 font-medium text-lg">{selectedUser()?.first ?? "- "}</div>
      <div class="flex flex-row  gap-3">
        <div class="flex flex-col gap-5">
        <div class="flex flex-row justify-between items-baseline">
          <div class="font-bold text-xl">
            Users
          </div>
        </div>
        <ul class="menu bg-base-200 w-56 rounded-box">
          <For each={users()} fallback={<div>no users</div>}>
            {(item, index) => (
            <li
              onClick={() => setSelectedUser(item)}
            >
              <a> {item.first} </a>
            </li>
            )}
          </For>
        </ul>
        </div>
      <Show when={selectedUser() !== null} fallback={<div class="text-center mx-auto text-lg">No user selected.</div>}>
        <div class="w-3/4">
          <div class="overflow-x-auto">
          <table class="table">
          <thead>
            <tr>
              <th>netID</th>
              <th>Email</th>
              <th>Status</th>
              <th>Number</th>
              <th>Venmo Username</th>
              <th>Class</th>
            </tr>
          </thead>
            <tbody>
              <tr>
                <td>{selectedUser()?.username}</td>
                <td>{selectedUser()?.email}</td>
                <td>{selectedUser()?.status}</td>
                <td>{selectedUser()?.number}</td>
                <td>{selectedUser()?.venmo}</td>
                <td>{selectedUser()?.class}</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </Show>
      </div>
  </main>
  );
}
