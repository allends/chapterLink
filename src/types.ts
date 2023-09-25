export type User = {
  id: string
  first: string
  last: string
  username: string
  email: string
  status: string
  venmo: string
  birthday: string 
  class: string 
  number: string
  permissions: string[]
  
}

export type Event = {
  id: string
  attendees: string[],
  name: string
  value: number
  date: string
  category: string
  semester: Semester
  location: string
  description: string
  expand: Expand | null
}

export type Expand = {
  attendees: User[]
  organizers: User[]
}

export type Points = {
  userId: string
  first: string
  category: string
  semester: Semester
  points: number
}

export type AttendenceRequest = {
  id: string,
  event: string,
  user: string
}

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type Year = `${Digit}${Digit}${Digit}${Digit}`
export type Semester = `spring ${Year}` | `fall ${Year}`

