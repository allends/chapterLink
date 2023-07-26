import { User } from "~/types"

export const UserCard = ({user}: {user: User}) => {
  return (
    <div>{user.first}</div>
  )
}
