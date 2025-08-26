"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Plus, Edit, Trash2, Clock, AlertCircle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Reminder {
  id: string
  title: string
  message: string
  time: string
  date: string
  priority: "low" | "medium" | "high"
  leadTime: number // minutes before
  isActive: boolean
  isCompleted: boolean
  category: "class" | "meeting" | "task" | "other"
}

const mockReminders: Reminder[] = [
  {
    id: "1",
    title: "Prepare Lab Equipment",
    message: "Set up microscopes and slides for Biology class",
    time: "08:45",
    date: "2024-01-15",
    priority: "high",
    leadTime: 15,
    isActive: true,
    isCompleted: false,
    category: "class",
  },
  {
    id: "2",
    title: "Grade Assignments",
    message: "Grade Math assignments before afternoon class",
    time: "12:30",
    date: "2024-01-15",
    priority: "medium",
    leadTime: 30,
    isActive: true,
    isCompleted: false,
    category: "task",
  },
  {
    id: "3",
    title: "Parent Meeting",
    message: "Prepare materials for parent-teacher conference",
    time: "16:00",
    date: "2024-01-15",
    priority: "low",
    leadTime: 60,
    isActive: true,
    isCompleted: true,
    category: "meeting",
  },
  {
    id: "4",
    title: "Submit Reports",
    message: "Submit monthly progress reports to administration",
    time: "14:00",
    date: "2024-01-16",
    priority: "high",
    leadTime: 120,
    isActive: true,
    isCompleted: false,
    category: "task",
  },
]

export function RemindersView() {
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null)
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    time: "",
    date: "",
    priority: "medium" as const,
    leadTime: 15,
    category: "task" as const,
  })

  useEffect(() => {
    // Check for due reminders every minute
    const interval = setInterval(() => {
      const now = new Date()
      const currentTime =
        now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0")
      const currentDate = now.toISOString().split("T")[0]

      reminders.forEach((reminder) => {
        if (reminder.isActive && !reminder.isCompleted && reminder.date === currentDate) {
          const reminderTime = new Date(`${reminder.date}T${reminder.time}:00`)
          const leadTimeMs = reminder.leadTime * 60 * 1000
          const notificationTime = new Date(reminderTime.getTime() - leadTimeMs)

          if (now >= notificationTime && now < reminderTime) {
            toast({
              title: `Reminder: ${reminder.title}`,
              description: reminder.message,
              duration: 5000,
            })
          }
        }
      })
    }, 60000)

    return () => clearInterval(interval)
  }, [reminders, toast])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingReminder) {
      setReminders((prev) =>
        prev.map((r) => (r.id === editingReminder.id ? { ...r, ...formData, isActive: true, isCompleted: false } : r)),
      )
      toast({
        title: "Reminder updated",
        description: "Your reminder has been successfully updated.",
      })
    } else {
      const newReminder: Reminder = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        isCompleted: false,
      }
      setReminders((prev) => [...prev, newReminder])
      toast({
        title: "Reminder created",
        description: "Your new reminder has been added.",
      })
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      message: "",
      time: "",
      date: "",
      priority: "medium",
      leadTime: 15,
      category: "task",
    })
    setEditingReminder(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (reminder: Reminder) => {
    setEditingReminder(reminder)
    setFormData({
      title: reminder.title,
      message: reminder.message,
      time: reminder.time,
      date: reminder.date,
      priority: reminder.priority,
      leadTime: reminder.leadTime,
      category: reminder.category,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id))
    toast({
      title: "Reminder deleted",
      description: "The reminder has been removed.",
    })
  }

  const toggleActive = (id: string) => {
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)))
  }

  const toggleCompleted = (id: string) => {
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, isCompleted: !r.isCompleted } : r)))
  }

  const filteredReminders = reminders.filter((reminder) => {
    if (filter === "active") return reminder.isActive && !reminder.isCompleted
    if (filter === "completed") return reminder.isCompleted
    return true
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive"
      case "medium":
        return "text-secondary"
      default:
        return "text-muted-foreground"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "class":
        return "📚"
      case "meeting":
        return "👥"
      case "task":
        return "✅"
      default:
        return "📝"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reminders</h1>
          <p className="text-muted-foreground">Manage your tasks and notifications</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingReminder(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Reminder
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>{editingReminder ? "Edit Reminder" : "Create New Reminder"}</DialogTitle>
                <DialogDescription>Set up a reminder to stay on top of your tasks.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Reminder title"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Detailed reminder message"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value: any) => setFormData((prev) => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: any) => setFormData((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="class">Class</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="task">Task</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="leadTime">Lead Time (minutes before)</Label>
                  <Select
                    value={formData.leadTime.toString()}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, leadTime: Number.parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="1440">1 day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">{editingReminder ? "Update" : "Create"} Reminder</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          All ({reminders.length})
        </Button>
        <Button variant={filter === "active" ? "default" : "outline"} onClick={() => setFilter("active")}>
          Active ({reminders.filter((r) => r.isActive && !r.isCompleted).length})
        </Button>
        <Button variant={filter === "completed" ? "default" : "outline"} onClick={() => setFilter("completed")}>
          Completed ({reminders.filter((r) => r.isCompleted).length})
        </Button>
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {filteredReminders.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">No reminders found</h3>
                <p className="text-sm text-muted-foreground">Create your first reminder to get started.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredReminders.map((reminder) => (
            <Card
              key={reminder.id}
              className={`hover:shadow-md transition-shadow ${reminder.isCompleted ? "opacity-60" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg">{getCategoryIcon(reminder.category)}</span>
                      {reminder.isCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`font-semibold ${reminder.isCompleted ? "line-through" : ""}`}>
                          {reminder.title}
                        </h3>
                        <Badge
                          variant={
                            reminder.priority === "high"
                              ? "destructive"
                              : reminder.priority === "medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {reminder.priority}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">{reminder.message}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {new Date(reminder.date).toLocaleDateString()} at {reminder.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <AlertCircle className={`h-4 w-4 ${getPriorityColor(reminder.priority)}`} />
                          {reminder.leadTime} min before
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`active-${reminder.id}`} className="text-sm">
                        Active
                      </Label>
                      <Switch
                        id={`active-${reminder.id}`}
                        checked={reminder.isActive}
                        onCheckedChange={() => toggleActive(reminder.id)}
                      />
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleCompleted(reminder.id)}
                      className={reminder.isCompleted ? "text-green-500" : ""}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>

                    <Button variant="ghost" size="icon" onClick={() => handleEdit(reminder)}>
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(reminder.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
