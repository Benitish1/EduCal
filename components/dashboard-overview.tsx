"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Bell, Clock, BookOpen, Users, AlertCircle } from "lucide-react"

export function DashboardOverview() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [userEmail, setUserEmail] = useState("")
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    const email = localStorage.getItem("userEmail") || "teacher@school.edu"
    setUserEmail(email)
    return () => clearInterval(timer)
  }, [])

  const todayClasses = [
    { time: "09:00", subject: "Mathematics", room: "Room 101", students: 28 },
    { time: "10:30", subject: "Physics", room: "Lab 2", students: 24 },
    { time: "13:00", subject: "Chemistry", room: "Lab 1", students: 26 },
    { time: "14:30", subject: "Mathematics", room: "Room 101", students: 30 },
  ]

  const upcomingReminders = [
    { time: "08:45", message: "Prepare lab equipment for Physics class", priority: "high" },
    { time: "12:30", message: "Grade assignments before afternoon class", priority: "medium" },
    { time: "16:00", message: "Parent-teacher meeting preparation", priority: "low" },
  ]

  const stats = [
    { title: "Today's Classes", value: "4", icon: BookOpen, color: "text-primary" },
    { title: "Active Reminders", value: "3", icon: Bell, color: "text-secondary" },
    { title: "This Week", value: "18", icon: Calendar, color: "text-accent" },
    { title: "Total Students", value: "108", icon: Users, color: "text-muted-foreground" },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Good morning!</h1>
          <p className="text-muted-foreground">Welcome back, {userEmail.split("@")[0]}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {currentTime.toLocaleString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Schedule
            </CardTitle>
            <CardDescription>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayClasses.map((class_, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium text-primary">{class_.time}</div>
                  <div>
                    <div className="font-medium">{class_.subject}</div>
                    <div className="text-sm text-muted-foreground">
                      {class_.room} • {class_.students} students
                    </div>
                  </div>
                </div>
                <Badge variant="outline">{class_.students}</Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/timetable")}>
              View Full Timetable
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Reminders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-secondary" />
              Upcoming Reminders
            </CardTitle>
            <CardDescription>Stay on top of your tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingReminders.map((reminder, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <AlertCircle
                  className={`h-4 w-4 mt-0.5 ${
                    reminder.priority === "high"
                      ? "text-destructive"
                      : reminder.priority === "medium"
                        ? "text-secondary"
                        : "text-muted-foreground"
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-primary">{reminder.time}</span>
                    <Badge
                      variant={
                        reminder.priority === "high"
                          ? "destructive"
                          : reminder.priority === "medium"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {reminder.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground">{reminder.message}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/reminders")}>
              Manage Reminders
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
