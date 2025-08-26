"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Calendar, Bell, User, Settings, Menu, LogOut, Home } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Timetable", href: "/timetable", icon: Calendar },
  { name: "Reminders", href: "/reminders", icon: Bell },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  const NavItems = () => (
    <>
      {navigation.map((item) => {
        const Icon = item.icon
        return (
          <Button
            key={item.name}
            variant="ghost"
            className="w-full justify-start gap-3 h-12"
            onClick={() => {
              router.push(item.href)
              setSidebarOpen(false)
            }}
          >
            <Icon className="h-5 w-5" />
            {item.name}
          </Button>
        )
      })}
    </>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center gap-3">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold text-primary">EduCal</h2>
                    <p className="text-sm text-muted-foreground">Teacher Portal</p>
                  </div>
                  <nav className="flex-1 p-4 space-y-2">
                    <NavItems />
                  </nav>
                  <div className="p-4 border-t space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Theme</span>
                      <ThemeToggle />
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-bold text-primary">EduCal</h1>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="lg:flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-sidebar border-r">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-primary">EduCal</h2>
              <p className="text-sm text-muted-foreground">Teacher Portal</p>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              <NavItems />
            </nav>
            <div className="p-4 border-t space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-64 flex flex-col flex-1">
          <main className="flex-1 p-4 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
