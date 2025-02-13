"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Toast } from "@/components/ui/toast"

export function Reminders() {
  const [reminders, setReminders] = useState([])
  const [newReminder, setNewReminder] = useState("")
  const [showToast, setShowToast] = useState(false)

  const addReminder = (e) => {
    e.preventDefault()
    if (newReminder) {
      setReminders([...reminders, { id: Date.now(), text: newReminder }])
      setNewReminder("")
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reminders</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addReminder} className="space-y-4">
          <div>
            <Label htmlFor="reminder">New Reminder</Label>
            <Input
              id="reminder"
              value={newReminder}
              onChange={(e) => setNewReminder(e.target.value)}
              placeholder="Enter a reminder"
            />
          </div>
          <Button type="submit">Add Reminder</Button>
        </form>
        <ul className="mt-4 space-y-2">
          {reminders.map((reminder) => (
            <li key={reminder.id}>{reminder.text}</li>
          ))}
        </ul>
        {showToast && <Toast>Reminder added successfully!</Toast>}
      </CardContent>
    </Card>
  )
}

