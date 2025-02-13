"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { GripVertical } from "lucide-react"
import { motion } from "framer-motion"

export function HabitList({ habits, updateHabit, deleteHabit }) {
  const [localHabits, setLocalHabits] = useState(habits)

  const onDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(localHabits)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setLocalHabits(items)
  }

  const toggleHabit = (habit) => {
    const today = new Date().toISOString().split("T")[0]
    const completions = habit.completions || []
    const updatedCompletions = completions.includes(today)
      ? completions.filter((date) => date !== today)
      : [...completions, today]

    const streak = calculateStreak(updatedCompletions)
    updateHabit({ ...habit, completions: updatedCompletions, streak })
  }

  const calculateStreak = (completions) => {
    let streak = 0
    const today = new Date()
    for (let i = 0; i < completions.length; i++) {
      const date = new Date(completions[completions.length - 1 - i])
      if ((today.getTime() - date.getTime()) / (1000 * 3600 * 24) <= i) {
        streak++
      } else {
        break
      }
    }
    return streak
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="habits">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
            {localHabits.map((habit, index) => (
              <Draggable key={habit.id} draggableId={habit.id.toString()} index={index}>
                {(provided) => (
                  <motion.li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="flex items-center justify-between p-2 bg-card rounded-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center space-x-2">
                      <span {...provided.dragHandleProps}>
                        <GripVertical className="text-muted-foreground" />
                      </span>
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Checkbox
                          checked={habit.completions?.includes(new Date().toISOString().split("T")[0])}
                          onCheckedChange={() => toggleHabit(habit)}
                        />
                      </motion.div>
                      <span>{habit.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{habit.category}</span>
                      <span className="text-sm font-semibold">Streak: {habit.streak}</span>
                      <Button variant="destructive" size="sm" onClick={() => deleteHabit(habit.id)}>
                        Delete
                      </Button>
                    </div>
                  </motion.li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}

