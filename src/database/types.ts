export interface User {
  id: string
  email: string
}

export interface DoBefore {
  id: string
  description: string
  endDate: Date
  user: User
}

export interface DoToday {
  id: string
  description: string
  startDate: Date
  user: User
}

export interface DoTodayAt {
  id: string
  description: string
  startDate: Date
  user: User
}
