"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useConfetti } from "@/components/confetti"
import { motion } from "framer-motion"

const ACHIEVEMENTS = [
  { id: "streak3", name: "3-Day Streak", description: "Complete a habit for 3 days in a row", requiredStreak: 3 },
  { id: "streak7", name: "7-Day Streak", description: "Complete a habit for 7 days in a row", requiredStreak: 7 },
  { id: "streak30", name: "30-Day Streak", description: "Complete a habit for 30 days in a row", requiredStreak: 30 },
  { id: "habits5", name: "5 Habits", description: "Create and maintain 5 habits", requiredHabits: 5 },
  { id: "habits10", name: "10 Habits", description: "Create and maintain 10 habits", requiredHabits: 10 },
]

const REWARDS = [
  {
    id: "reward1",
    name: "20% off at PVR Cinemas",
    description: "Enjoy a movie night with a discount!",
    code: "HABIT20",
  },
  {
    id: "reward2",
    name: "Free coffee at Starbucks",
    description: "Claim your free coffee reward!",
    code: "HABITCOFFEE",
  },
  {
    id: "reward3",
    name: "15% off at Amazon",
    description: "Shop with a discount on your next purchase!",
    code: "HABITSAVE15",
  },
]

export function Achievements({ habits }) {
  const { triggerConfetti } = useConfetti()
  const [unlockedRewards, setUnlockedRewards] = useState([])

  const unlockedAchievements = ACHIEVEMENTS.filter((achievement) => {
    if (achievement.requiredStreak) {
      return habits.some((habit) => habit.streak >= achievement.requiredStreak)
    }
    if (achievement.requiredHabits) {
      return habits.length >= achievement.requiredHabits
    }
    return false
  })

  useEffect(() => {
    const newUnlockedAchievements = ACHIEVEMENTS.filter((achievement) => {
      if (achievement.requiredStreak) {
        return habits.some((habit) => habit.streak >= achievement.requiredStreak)
      }
      if (achievement.requiredHabits) {
        return habits.length >= achievement.requiredHabits
      }
      return false
    })

    const newlyUnlockedAchievements = newUnlockedAchievements.filter(
      (achievement) => !unlockedRewards.some((reward) => reward.achievementId === achievement.id),
    )

    if (newlyUnlockedAchievements.length > 0) {
      triggerConfetti()
      const newUnlockedRewards = newlyUnlockedAchievements
        .map((achievement) => {
          const availableRewards = REWARDS.filter((reward) => !unlockedRewards.some((r) => r.id === reward.id))
          if (availableRewards.length > 0) {
            const randomReward = availableRewards[Math.floor(Math.random() * availableRewards.length)]
            return { ...randomReward, achievementId: achievement.id }
          }
          return null
        })
        .filter(Boolean)
      setUnlockedRewards((prev) => [...prev, ...newUnlockedRewards])
    }
  }, [habits, unlockedRewards, triggerConfetti])

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {ACHIEVEMENTS.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div>
                  <h3 className="font-semibold">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                {unlockedAchievements.some((a) => a.id === achievement.id) ? (
                  <Badge variant="success">Unlocked</Badge>
                ) : (
                  <Badge variant="secondary">Locked</Badge>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {unlockedRewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div>
                  <h3 className="font-semibold">{reward.name}</h3>
                  <p className="text-sm text-muted-foreground">{reward.description}</p>
                  <p className="text-sm font-medium">Code: {reward.code}</p>
                </div>
                <Badge variant="success">Claimed</Badge>
              </motion.div>
            ))}
            {unlockedRewards.length === 0 && (
              <p className="text-sm text-muted-foreground">Unlock achievements to earn rewards!</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

