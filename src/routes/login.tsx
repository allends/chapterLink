import { createSignal } from "solid-js"
import { login } from "~/service"

export default function LoginPage() {

  const [userName, setUserName] = createSignal("")
  const [password, setPassword] = createSignal("")

  const onSubmit = async () => {
    await login(userName(), password())
    window.location.pathname = "/"
  }

  return (
    <div class="prose flex flex-col items-center mx-auto">
      <h1 class="my-3">login</h1>
      <div class="flex flex-col align-middle gap-3">
        <input type="text"
          placeholder="netID"
          class="input input-bordered w-full max-w-xs"
          value={userName()}
          onChange={(e) => {
            setUserName(e.target.value)
          }}
        />
        <input
          type="password"
          placeholder="password"
          class="input input-bordered w-full max-w-xs"
          value={password()}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <button class="btn" onClick={onSubmit}>Login</button>
      </div>
      <a href="/create" class="my-2">create user</a>
    </div>
  )
}
