"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CalendarView({ habits }) {
  const [date, setDate] = useState(new Date())

  const getCompletedHabitsForDate = (date) => {
    const dateString = date.toISOString().split("T")[0]
    return habits.filter((habit) => habit.completions?.includes(dateString))
  }

  const completedHabits = getCompletedHabitsForDate(date)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Completed Habits</CardTitle>
        </CardHeader>
        <CardContent>
          {completedHabits.length > 0 ? (
            <ul className="list-disc pl-4">
              {completedHabits.map((habit) => (
                <li key={habit.id}>{habit.name}</li>
              ))}
            </ul>
          ) : (
            <p>No habits completed on this day.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

