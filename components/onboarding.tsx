"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ONBOARDING_STEPS = [
  {
    title: "Welcome to Habit Tracker",
    content: "Track your habits, achieve your goals, and build a better you.",
  },
  {
    title: "Create Your First Habit",
    content: "Start by adding a habit you want to track. It can be anything from drinking water to reading daily.",
  },
  {
    title: "Track Your Progress",
    content: "Mark your habits as complete each day to build streaks and see your progress over time.",
  },
  {
    title: "Stay Motivated",
    content: "Unlock achievements and view your statistics to stay motivated on your journey.",
  },
]

export function Onboarding({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{ONBOARDING_STEPS[currentStep].title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{ONBOARDING_STEPS[currentStep].content}</p>
        <Button onClick={nextStep}>{currentStep < ONBOARDING_STEPS.length - 1 ? "Next" : "Get Started"}</Button>
      </CardContent>
    </Card>
  )
}

