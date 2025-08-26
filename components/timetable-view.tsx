"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Users, Eye, EyeOff } from "lucide-react"

type ViewMode = "daily" | "weekly" | "monthly"

interface ClassEvent {
  id: string
  subject: string
  time: string
  endTime: string
  room: string
  students: number
  color: string
  day: string
  date: string
  teacher: string
  isMyClass: boolean
}

const mockClasses: ClassEvent[] = [
  // Teacher's classes
  {
    id: "1",
    subject: "Mathematics",
    time: "09:00",
    endTime: "10:00",
    room: "Room 101",
    students: 28,
    color: "bg-primary",
    day: "Monday",
    date: "2024-01-15",
    teacher: "You",
    isMyClass: true,
  },
  {
    id: "2",
    subject: "Physics",
    time: "10:30",
    endTime: "11:30",
    room: "Lab 2",
    students: 24,
    color: "bg-secondary",
    day: "Monday",
    date: "2024-01-15",
    teacher: "You",
    isMyClass: true,
  },
  {
    id: "3",
    subject: "Chemistry",
    time: "13:00",
    endTime: "14:00",
    room: "Lab 1",
    students: 26,
    color: "bg-accent",
    day: "Monday",
    date: "2024-01-15",
    teacher: "You",
    isMyClass: true,
  },
  // Other teachers' classes
  {
    id: "4",
    subject: "English Literature",
    time: "08:00",
    endTime: "09:00",
    room: "Room 201",
    students: 25,
    color: "bg-chart-4",
    day: "Monday",
    date: "2024-01-15",
    teacher: "Ms. Johnson",
    isMyClass: false,
  },
  {
    id: "5",
    subject: "History",
    time: "11:00",
    endTime: "12:00",
    room: "Room 301",
    students: 30,
    color: "bg-chart-5",
    day: "Monday",
    date: "2024-01-15",
    teacher: "Mr. Davis",
    isMyClass: false,
  },
  {
    id: "6",
    subject: "Art",
    time: "14:30",
    endTime: "15:30",
    room: "Art Studio",
    students: 20,
    color: "bg-chart-3",
    day: "Monday",
    date: "2024-01-15",
    teacher: "Mrs. Wilson",
    isMyClass: false,
  },
  {
    id: "7",
    subject: "Biology",
    time: "09:00",
    endTime: "10:00",
    room: "Lab 3",
    students: 22,
    color: "bg-chart-3",
    day: "Tuesday",
    date: "2024-01-16",
    teacher: "Dr. Brown",
    isMyClass: false,
  },
  {
    id: "8",
    subject: "Physics",
    time: "11:00",
    endTime: "12:00",
    room: "Lab 2",
    students: 25,
    color: "bg-secondary",
    day: "Tuesday",
    date: "2024-01-16",
    teacher: "You",
    isMyClass: true,
  },
  {
    id: "9",
    subject: "Computer Science",
    time: "13:30",
    endTime: "14:30",
    room: "Computer Lab",
    students: 18,
    color: "bg-chart-1",
    day: "Tuesday",
    date: "2024-01-16",
    teacher: "Mr. Tech",
    isMyClass: false,
  },
  {
    id: "10",
    subject: "Mathematics",
    time: "14:00",
    endTime: "15:00",
    room: "Room 101",
    students: 27,
    color: "bg-primary",
    day: "Wednesday",
    date: "2024-01-17",
    teacher: "You",
    isMyClass: true,
  },
  {
    id: "11",
    subject: "French",
    time: "10:00",
    endTime: "11:00",
    room: "Room 401",
    students: 15,
    color: "bg-chart-2",
    day: "Wednesday",
    date: "2024-01-17",
    teacher: "Mme. Dubois",
    isMyClass: false,
  },
  {
    id: "12",
    subject: "Physical Education",
    time: "15:00",
    endTime: "16:00",
    room: "Gymnasium",
    students: 35,
    color: "bg-chart-4",
    day: "Wednesday",
    date: "2024-01-17",
    teacher: "Coach Smith",
    isMyClass: false,
  },
]

export function TimetableView() {
  const [viewMode, setViewMode] = useState<ViewMode>("weekly")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showAllClasses, setShowAllClasses] = useState(false)

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (viewMode === "daily") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
    } else if (viewMode === "weekly") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
    }
    setCurrentDate(newDate)
  }

  const getDateRange = () => {
    if (viewMode === "daily") {
      return currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } else if (viewMode === "weekly") {
      const startOfWeek = new Date(currentDate)
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1)
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)
      return `${startOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
    } else {
      return currentDate.toLocaleDateString("en-US", { year: "numeric", month: "long" })
    }
  }

  const filteredClasses = useMemo(() => {
    const classes = showAllClasses ? mockClasses : mockClasses.filter((cls) => cls.isMyClass)

    if (viewMode === "daily") {
      const today = currentDate.toLocaleDateString("en-US", { weekday: "long" })
      return classes.filter((cls) => cls.day === today)
    }
    return classes
  }, [viewMode, currentDate, showAllClasses])

  const DailyView = () => (
    <div className="space-y-4">
      {filteredClasses.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">No classes scheduled</h3>
              <p className="text-sm text-muted-foreground">Enjoy your free day!</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        filteredClasses.map((classEvent) => (
          <Card
            key={classEvent.id}
            className={`hover:shadow-md transition-shadow ${!classEvent.isMyClass ? "opacity-75" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-12 rounded ${classEvent.color}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{classEvent.subject}</h3>
                      {!classEvent.isMyClass && (
                        <Badge variant="outline" className="text-xs">
                          {classEvent.teacher}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {classEvent.time} - {classEvent.endTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {classEvent.room}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {classEvent.students} students
                      </div>
                    </div>
                  </div>
                </div>
                <Badge variant="outline">{classEvent.students}</Badge>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )

  const WeeklyView = () => (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-6 gap-2 mb-4">
          <div className="p-2 text-sm font-medium text-muted-foreground">Time</div>
          {weekDays.map((day) => (
            <div key={day} className="p-2 text-sm font-medium text-center bg-muted rounded">
              {day}
            </div>
          ))}
        </div>
        <div className="space-y-1">
          {timeSlots.map((time) => (
            <div key={time} className="grid grid-cols-6 gap-2 min-h-[60px]">
              <div className="p-2 text-sm text-muted-foreground font-medium">{time}</div>
              {weekDays.map((day) => {
                const classesForSlot = filteredClasses.filter((cls) => cls.day === day && cls.time === time)
                return (
                  <div key={`${day}-${time}`} className="p-1 space-y-1">
                    {classesForSlot.map((classForSlot) => (
                      <div
                        key={classForSlot.id}
                        className={`p-2 rounded text-white text-xs ${classForSlot.color} hover:opacity-80 cursor-pointer transition-opacity ${!classForSlot.isMyClass ? "opacity-75" : ""}`}
                      >
                        <div className="font-medium">{classForSlot.subject}</div>
                        <div className="opacity-90">{classForSlot.room}</div>
                        {!classForSlot.isMyClass && <div className="opacity-75 text-xs">{classForSlot.teacher}</div>}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const MonthlyView = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const emptyDays = Array.from({ length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 }, (_, i) => i)

    return (
      <div className="grid grid-cols-7 gap-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="p-2 text-sm font-medium text-center text-muted-foreground">
            {day}
          </div>
        ))}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="p-2 h-24" />
        ))}
        {days.map((day) => {
          const dayClasses = filteredClasses.filter((cls) => {
            const classDate = new Date(cls.date)
            return (
              classDate.getDate() === day &&
              classDate.getMonth() === currentDate.getMonth() &&
              classDate.getFullYear() === currentDate.getFullYear()
            )
          })

          return (
            <Card key={day} className="h-24 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-2 h-full">
                <div className="text-sm font-medium mb-1">{day}</div>
                <div className="space-y-1">
                  {dayClasses.slice(0, 2).map((cls) => (
                    <div
                      key={cls.id}
                      className={`text-xs p-1 rounded text-white ${cls.color} ${!cls.isMyClass ? "opacity-75" : ""}`}
                    >
                      {cls.subject}
                      {!cls.isMyClass && <div className="text-xs opacity-75">{cls.teacher}</div>}
                    </div>
                  ))}
                  {dayClasses.length > 2 && (
                    <div className="text-xs text-muted-foreground">+{dayClasses.length - 2} more</div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Timetable</h1>
          <p className="text-muted-foreground">Manage your class schedule</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="show-all-classes" checked={showAllClasses} onCheckedChange={setShowAllClasses} />
            <Label htmlFor="show-all-classes" className="text-sm">
              {showAllClasses ? (
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  All Classes
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <EyeOff className="h-4 w-4" />
                  My Classes
                </span>
              )}
            </Label>
          </div>

          {/* View Mode Tabs */}
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                {getDateRange()}
              </CardTitle>
              <CardDescription>
                {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} view
                {showAllClasses ? " - Showing all school classes" : " - Showing only your classes"}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => navigateDate("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="icon" onClick={() => navigateDate("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={viewMode} className="w-full">
            <TabsContent value="daily" className="mt-0">
              <DailyView />
            </TabsContent>
            <TabsContent value="weekly" className="mt-0">
              <WeeklyView />
            </TabsContent>
            <TabsContent value="monthly" className="mt-0">
              <MonthlyView />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
