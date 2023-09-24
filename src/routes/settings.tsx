import { onMount } from "solid-js"
import { createStore } from "solid-js/store"
import toast from "solid-toast"
import { pbStore, updateUser } from "~/service"

const initalSettingFormState = {
  first: "",
  last: "",
  venmo: "",
  number: "",
  birthday: ""
}

type SettingFormType = typeof initalSettingFormState

export default function settings() {

  const [userInfo, setUserInfo] = createStore<SettingFormType>(initalSettingFormState) 

  onMount(() => {
    setUserInfo({
      "first": pbStore.user?.first,
      "last": pbStore.user?.last,
      "venmo": pbStore.user?.venmo,
      "number": pbStore.user?.number,
      "birthday": pbStore.user?.birthday.split(" ")[0],
    })
  })

  const submitUserInfo = async () => {
    try {
      await updateUser(userInfo.venmo, userInfo.number, userInfo.birthday)
      setUserInfo({
        "first": pbStore.user?.first,
        "last": pbStore.user?.last,
        "venmo": pbStore.user?.venmo,
        "number": pbStore.user?.number,
        "birthday": pbStore.user?.birthday.split(" ")[0],
      })
      toast.success("User info updated")
    } catch (e) {
      console.error(e)
      toast.error("Could not update user info")
    }
    
  }

  return (
    <div class="prose flex flex-col items-center mx-auto my-5">
      <h1>User information</h1>
      <div class="overflow-x-auto">
        <table class="table">
          <tbody>
            <tr>
              <th>Name</th>
              <th><input class="input outline" type="text" value={`${userInfo.first} ${userInfo.last}`} disabled /></th>
            </tr>
            <tr>
              <th>Venmo</th>
              <th><input class="input outline" type="text" value={userInfo.venmo} onChange={e => setUserInfo("venmo", e.target.value)} /></th>
            </tr>
            <tr>
              <th>Number</th>
              <th><input class={`input outline ${userInfo?.number?.length !== 10 && "outline-error"}`} type="text" value={userInfo.number} onChange={e => setUserInfo("number", e.target.value)}/></th>
            </tr>
            <tr>
              <th>Birthday</th>
              <th><input class="input outline" type="date" value={userInfo.birthday} onChange={e => setUserInfo("birthday", e.target.value)} /></th>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="btn outline" onClick={submitUserInfo} disabled={userInfo.number?.length !== 10}>Confirm</button>
    </div>
  )
}
