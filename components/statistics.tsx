"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ReactCalendarHeatmap from "react-calendar-heatmap"
import "react-calendar-heatmap/dist/styles.css"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function Statistics({ habits }) {
  const totalHabits = habits.length
  const completedToday = habits.filter((habit) =>
    habit.completions?.includes(new Date().toISOString().split("T")[0]),
  ).length
  const longestStreak = Math.max(...habits.map((habit) => habit.streak))

  const getHeatmapData = () => {
    const today = new Date()
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
    const dateRange = []
    for (let d = oneYearAgo; d <= today; d.setDate(d.getDate() + 1)) {
      dateRange.push(new Date(d))
    }

    return dateRange.map((date) => {
      const dateString = date.toISOString().split("T")[0]
      const count = habits.reduce((acc, habit) => {
        return acc + (habit.completions?.includes(dateString) ? 1 : 0)
      }, 0)
      return { date: dateString, count }
    })
  }

  const getMonthlyTimeSpent = () => {
    const monthlyData = {}
    const today = new Date()
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1)

    for (let d = sixMonthsAgo; d <= today; d.setMonth(d.getMonth() + 1)) {
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      monthlyData[monthKey] = 0
    }

    habits.forEach((habit) => {
      habit.completions.forEach((completion) => {
        const [year, month] = completion.split("-")
        const monthKey = `${year}-${month}`
        if (monthlyData.hasOwnProperty(monthKey)) {
          monthlyData[monthKey] += habit.timeSpent
        }
      })
    })

    return Object.entries(monthlyData).map(([month, timeSpent]) => ({
      month,
      timeSpent,
    }))
  }

  const monthlyTimeSpentData = getMonthlyTimeSpent()

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Total Habits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalHabits}</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Completed Today</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{completedToday}</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Longest Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{longestStreak}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Habit Completion Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <ReactCalendarHeatmap
              startDate={new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate())}
              endDate={new Date()}
              values={getHeatmapData()}
              classForValue={(value) => {
                if (!value || value.count === 0) {
                  return "color-empty"
                }
                return `color-scale-${Math.min(value.count, 4)}`
              }}
            />
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Monthly Time Spent on Habits</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTimeSpentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: "Time Spent (minutes)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="timeSpent" fill="#8884d8" name="Time Spent (minutes)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

