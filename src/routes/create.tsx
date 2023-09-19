import { Show, createMemo, createSignal } from "solid-js"
import { createStore } from "solid-js/store"
import { createUser } from "~/service"

export default function create() {
  const [userForm, setUserForm] = createStore({
    "first": "",
    "last": "",
    "netID": "",
    "password": "",
    "confirmPassword": "",
  })

  const onSubmit = async () => {
    console.log(userForm)
    await createUser(userForm.netID, userForm.first, userForm.last, userForm.password, userForm.confirmPassword)
    // window.location.pathname = "/login"
  }

  const buttonText = createMemo(() => {
    if (userForm.password !== userForm.confirmPassword && userForm.confirmPassword !== "") return "Passwords must match"
    if (userForm.password.length < 8) return "Password > 8 characters"
    return "Sign Up"
  })

  return (
    <div class="prose flex flex-col items-center mx-auto">
      <h1 class="my-3">login</h1>
      <div class="flex flex-col align-middle gap-3 max-w-sm">
        <div class="flex flex-row gap-1">
          <input type="text"
            placeholder="First"
            class="input input-bordered w-full max-w-xs"
            value={userForm.first}
            onChange={(e) => {
              setUserForm("first",e.target.value)
            }}
          />
          <input type="text"
            placeholder="Last"
            class="input input-bordered w-full max-w-xs"
            value={userForm.last}
            onChange={(e) => {
              setUserForm("last",e.target.value)
            }}
          />
        </div>
        <input type="text"
          placeholder="netID"
          class="input input-bordered w-full"
          value={userForm.netID}
          onChange={(e) => {
            setUserForm("netID",e.target.value)
          }}
        />
        <input
          type="password"
          placeholder="Password"
          class="input input-bordered w-full"
          value={userForm.password}
          onChange={(e) => {
            setUserForm("password",e.target.value)
          }}
        />
        <input
          type="password"
          placeholder="Confirm password"
          class="input input-bordered w-full"
          value={userForm.confirmPassword}
          onChange={(e) => {
            setUserForm("confirmPassword",e.target.value)
          }}
        />
        <button class="btn" onClick={onSubmit} disabled={buttonText() !== "Sign Up"}>{buttonText()}</button>
      </div>
      <a href="/login" class="my-2">log in</a>
    </div>
  )
}
