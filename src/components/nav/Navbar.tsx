import { Show } from "solid-js";
import { A } from "solid-start";
import { logout, pbStore } from "~/service";
import { useAuth } from "~/service/auth/AuthContext";

export function Navbar() {
  const { user } = useAuth()
  return (
    <nav class="navbar bg-base-200">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabIndex={0} class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabIndex={0} class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><A href="/">Homepage</A></li>
            <li><A href="/app/user/all">Users</A></li>
            <li><A href="/app/events">Events</A></li>
            <Show when={pbStore.user?.permissions.includes("events")}>
              <li><a href="/app/approvals">Approvals</a></li>
            </Show>
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <A class="btn btn-ghost normal-case text-xl" href="/">chapterLink</A>
      </div>
      <div class="navbar-end">
        <div class="dropdown dropdown-end">
          <label tabIndex={0} class="btn outline btn-circle">
            {user().first[0]}
          </label>
          <ul tabIndex={0} class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><A href="/app/settings">Settings</A></li>
            <li><button onClick={logout}>Logout</button></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}