"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HabitList } from "@/components/habit-list"
import { CalendarView } from "@/components/calendar-view"
import { Statistics } from "@/components/statistics"
import { DetailedStatistics } from "@/components/detailed-statistics"
import { Achievements } from "@/components/achievements"
import { Reminders } from "@/components/reminders"
import { AddHabitForm } from "@/components/add-habit-form"
import { ModeToggle } from "@/components/mode-toggle"
import { Onboarding } from "@/components/onboarding"
import type { Habit } from "@/types/habit"

export function Dashboard() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [showOnboarding, setShowOnboarding] = useState(true)

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem("onboardingCompleted")
    if (onboardingCompleted) {
      setShowOnboarding(false)
    }
    // Initialize with some sample data
    setHabits([
      { id: "1", name: "Exercise", category: "Health & Fitness", streak: 3, completions: [], timeSpent: 30 },
      { id: "2", name: "Read", category: "Personal Development", streak: 5, completions: [], timeSpent: 20 },
    ])
  }, [])

  const completeOnboarding = () => {
    setShowOnboarding(false)
    localStorage.setItem("onboardingCompleted", "true")
  }

  const addHabit = (newHabit: Omit<Habit, "id" | "streak" | "completions">) => {
    const habit: Habit = {
      ...newHabit,
      id: Date.now().toString(),
      streak: 0,
      completions: [],
    }
    setHabits([...habits, habit])
  }

  const updateHabit = (updatedHabit: Habit) => {
    setHabits(habits.map((h) => (h.id === updatedHabit.id ? updatedHabit : h)))
  }

  const deleteHabit = (habitId: string) => {
    setHabits(habits.filter((h) => h.id !== habitId))
  }

  if (showOnboarding) {
    return <Onboarding onComplete={completeOnboarding} />
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <ModeToggle />
      </div>
      <AddHabitForm onAddHabit={addHabit} />

      <Tabs defaultValue="habits" className="mt-6">
        <TabsList>
          <TabsTrigger value="habits">Habits</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
        </TabsList>
        <TabsContent value="habits">
          <HabitList habits={habits} updateHabit={updateHabit} deleteHabit={deleteHabit} />
        </TabsContent>
        <TabsContent value="calendar">
          <CalendarView habits={habits} />
        </TabsContent>
        <TabsContent value="statistics">
          <Statistics habits={habits} />
          <DetailedStatistics habits={habits} />
        </TabsContent>
        <TabsContent value="achievements">
          <Achievements habits={habits} />
        </TabsContent>
        <TabsContent value="reminders">
          <Reminders />
        </TabsContent>
      </Tabs>
    </div>
  )
}

