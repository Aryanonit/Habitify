export interface Habit {
  id: string
  name: string
  category: string
  streak: number
  completions: string[]
  timeSpent: number // Time spent in minutes
}

