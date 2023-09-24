import { Show, createSignal } from "solid-js"
import { createStore } from "solid-js/store"
import toast from "solid-toast"
import { login } from "~/service"

export default function LoginPage() {

  const [loginInfo, setLoginInfo] = createStore({
    userName: "",
    password: ""
  })

  const onSubmit = () => {
    login(loginInfo.userName, loginInfo.password).then(() => {
      window.location.pathname = "/"
    }).catch(() => {
      toast.error("Invalid login")
    })
  }

  return (
    <div class="prose flex flex-col items-center mx-auto">
      <h1 class="my-3">Login</h1>
      <div class="flex flex-col align-middle gap-3">
        <input type="text"
          placeholder="netID"
          class="input input-bordered w-full max-w-xs"
          value={loginInfo.userName}
          onChange={(e) => {
            setLoginInfo("userName", e.target.value)
          }}
        />
        <input type="password"
          placeholder="password"
          class="input input-bordered w-full max-w-xs"
          value={loginInfo.password}
          onChange={(e) => {
            setLoginInfo("password", e.target.value)
          }}
        />
        <button class="btn" onClick={onSubmit}>Login</button>
      </div>
      <a href="/create" class="my-2">create user</a>
    </div>
  )
}
