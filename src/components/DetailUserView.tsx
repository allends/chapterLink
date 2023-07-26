import { User } from "~/types"

const DetailUserView = ({user}: {user: User}) => {
  return (
    <div>{user.first}</div>
  )
}

export default DetailUserView
