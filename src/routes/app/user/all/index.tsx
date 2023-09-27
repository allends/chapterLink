import { For } from "solid-js";
import { UserCard } from "~/components/user/UserCard";
import { getUsers } from "~/service";
import { createRequest } from "~/utils/createRequest";

export const createUsersState = () => {
  const userRequest = createRequest(getUsers)

  return {
    users: userRequest.data,
    usersLoading: userRequest.loading,
    usersError: userRequest.error,
  }
}

export default function users() {

  const _S = createUsersState()

  return (
    <main class="text-center mx-auto p-4">
      <div class="font-bold text-3xl mb-5">
        Users
      </div>
      <div class="flex flex-col gap-5">
      <For each={_S.users()} fallback={<div>no users</div>}>
        {
          (item, index) => {
            return <UserCard user={item} />
          }
        }
      </For>
      </div>
    </main>
  );
}
