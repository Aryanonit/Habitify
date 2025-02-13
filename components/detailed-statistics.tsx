"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function DetailedStatistics({ habits }) {
  const [selectedHabit, setSelectedHabit] = useState(habits[0]?.id)

  const getHabitCompletionData = (habitId) => {
    const habit = habits.find((h) => h.id === habitId)
    if (!habit) return []

    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split("T")[0]
    }).reverse()

    return last30Days.map((date) => ({
      date,
      completed: habit.completions?.includes(date) ? 1 : 0,
    }))
  }

  const habitCompletionData = getHabitCompletionData(selectedHabit)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Habit Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedHabit} onValueChange={setSelectedHabit}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a habit" />
            </SelectTrigger>
            <SelectContent>
              {habits.map((habit) => (
                <SelectItem key={habit.id} value={habit.id}>
                  {habit.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={habitCompletionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

