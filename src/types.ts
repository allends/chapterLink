export interface User {
  id: string;
  first: string;
  last: string;
  username: string;
  email: string;
  status: string;
  venmo: string;
  birthday: string; 
  class: string; 
  number: string;
  permissions: [string]
  
}

export interface Event {
  id: string;
  name: string;
  value: number;
  date: string;
  category: string;
  semester: string;
  location: string;
  description: string;
  expand: Expand | null
}

export interface Expand {
  attendees: User[]
  organizers: User[]
}

export interface Points {
  userId: string;
  first: string;
  category: string;
  semester: string;
  points: number
}

export interface AttendenceRequest {
  user: User,
  event: Event
}
