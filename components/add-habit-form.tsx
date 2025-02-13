"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const CATEGORIES = [
  "Health & Fitness",
  "Personal Development",
  "Career & Education",
  "Relationships",
  "Hobbies & Creativity",
  "Finance",
  "Spirituality & Mindfulness",
  "Home & Environment",
]

export function AddHabitForm({ onAddHabit }) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [timeSpent, setTimeSpent] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && category && timeSpent) {
      onAddHabit({ name, category, timeSpent: Number.parseInt(timeSpent, 10) })
      setName("")
      setCategory("")
      setTimeSpent("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="habit-name">Habit Name</Label>
        <Input id="habit-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter habit name" />
      </div>
      <div>
        <Label htmlFor="habit-category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="habit-category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="time-spent">Time Spent (minutes per day)</Label>
        <Input
          id="time-spent"
          type="number"
          value={timeSpent}
          onChange={(e) => setTimeSpent(e.target.value)}
          placeholder="Enter time spent in minutes"
        />
      </div>
      <Button type="submit">Add Habit</Button>
    </form>
  )
}

