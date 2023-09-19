import { Show, createSignal } from "solid-js"
import { login } from "~/service"

export default function LoginPage() {

  const [userName, setUserName] = createSignal("")
  const [password, setPassword] = createSignal("")
  const [loginError, setLoginError] = createSignal(false)

  const onSubmit = () => {
    login(userName(), password()).then(() => {
      window.location.pathname = "/"
    }).catch(() => {
      setLoginError(true)
      setTimeout(() => setLoginError(false), 2000)
    })
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
      <Show when={loginError()}>
        <div class="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Wrong username or password</span>
        </div>
      </Show>
    </div>
  )
}
