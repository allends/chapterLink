import { For, Show, createEffect, createMemo } from "solid-js"
import { approveUserAttendenceRequest, getAllAttendenceRequests, getAllEvents, getUsers, rejectUserAttendenceRequest } from "~/service"
import { AttendenceRequest } from "~/types"
import { createRequest } from "~/utils/createRequest"

const createApprovalState = () => {
  const approvalsRequest = createRequest(getAllAttendenceRequests)
  const usersRequest = createRequest(getUsers)
  const eventsRequest = createRequest(getAllEvents)

  // TODO: this should be done on the backend lol
  const approvals = createMemo(() => {
    if (!approvalsRequest.data() || !usersRequest.data() || !eventsRequest.data() ) return []
    return approvalsRequest.data()?.map(request => {
      return {
        id: request.id,
        user: usersRequest.data()?.find(user => user.id === request.user)!,
        event: eventsRequest.data()?.find(event => event.id === request.event)!
      }
    }) || []
  })

  const handleApproveEvent = (id: string) => {
    const target = approvalsRequest.data()?.find(req => req.id === id)
    if (!target) return
    approveUserAttendenceRequest(target).then(() => {
      approvalsRequest.fetch()
    })
  }

  const handleRejectEvent = (id: string) => {
    const target = approvalsRequest.data()?.find(req => req.id === id)
    if (!target) return
    rejectUserAttendenceRequest(target).then(() => {
      approvalsRequest.fetch()
    })
  }

  return {
    approvals,
    handleApproveEvent,
    handleRejectEvent
  }
}

const Approvals = () => {
  const _S = createApprovalState()

  return (
    <main class="text-center mx-auto p-4">
      <div class="font-bold text-3xl mb-5">
        Approvals
      </div>
      <div class="flex flex-col gap-2">
      <For each={_S.approvals()}>
        {(item) => (
          <div class="bg-base-200 p-5 rounded-md flex flex-row items-center justify-between">
            <div>
              {item.event.name} = {item.user.first}
            </div>
            <div class="flex gap-2">
              <button class="btn btn-error" onClick={() => _S.handleRejectEvent(item.id)}>reject</button>
              <button class="btn btn-success" onClick={() => _S.handleApproveEvent(item.id)}>approve</button>
            </div>
          </div>
        )}
      </For>
      <Show when={_S.approvals().length === 0}>
        <div class="text-2xl text-neutral-400">No approvals</div>
      </Show>
      </div>
    </main>
  )
}

export default Approvals