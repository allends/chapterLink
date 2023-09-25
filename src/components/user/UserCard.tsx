import { User } from "~/types"

// This isn't quite right but it will do for now
function parseDateString(dateString: string): Date | null {
  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2}).(\d{3})Z$/);

  if (match) {
    const [, year, month, day, hour, minute, second, millisecond] = match.map(Number);
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second, millisecond));
  }

  return null; // Return null for invalid input
}

export const UserCard = (props: { user: User }) => {
  return (
    <div class="flex flex-row w-full bg-base-200 items-center p-5 rounded-3xl">
      <div class={`avatar placeholder ${props.user.status === 'active' && 'online'} ${props.user.status === 'inactive' && 'offline'}`}>
        <div class="bg-neutral-focus text-neutral-content rounded-full w-14 h-14">
          <span class="text-3xl">{props.user.first.charAt(0)}</span>
        </div>
      </div>
      <div class="flex flex-col ml-10 items-start">
        <h1 class="text-2xl font-bold">{props.user.first}</h1>
        <div>{props.user.number}</div>
        <div>{parseDateString(props.user.birthday)?.toDateString() ?? "Wish them hbd whenever you want"}</div>
      </div>
    </div>
  )
}

