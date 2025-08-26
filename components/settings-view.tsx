"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { Settings, Lock, Bell, Palette, Shield, Eye, EyeOff } from "lucide-react"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"

interface NotificationSettings {
  emailReminders: boolean
  pushNotifications: boolean
  classUpdates: boolean
  systemAlerts: boolean
  reminderLeadTime: string
  quietHours: boolean
  quietStart: string
  quietEnd: string
}

export function SettingsView() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPasswords, setShowPasswords] = useState(false)

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailReminders: true,
    pushNotifications: true,
    classUpdates: true,
    systemAlerts: false,
    reminderLeadTime: "15",
    quietHours: true,
    quietStart: "22:00",
    quietEnd: "07:00",
  })

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirmation don't match.",
        variant: "destructive",
      })
      return
    }

    if (newPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    // Simulate password change
    toast({
      title: "Password updated",
      description: "Your password has been successfully changed.",
    })

    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean | string) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
    toast({
      title: "Settings updated",
      description: "Your notification preferences have been saved.",
    })
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    toast({
      title: "Theme updated",
      description: `Switched to ${newTheme} theme.`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Appearance
            </CardTitle>
            <CardDescription>Customize the look and feel of your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Theme</Label>
                <p className="text-sm text-muted-foreground mb-3">Choose your preferred theme for the application</p>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Current theme: {theme || "system"}</p>
                    <p className="text-xs text-muted-foreground">Changes the overall appearance of the app</p>
                  </div>
                  <ThemeToggle />
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium">Theme Options</Label>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleThemeChange("light")}
                  >
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleThemeChange("dark")}
                  >
                    Dark
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleThemeChange("system")}
                  >
                    System
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security
            </CardTitle>
            <CardDescription>Manage your password and security preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPasswords ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPasswords(!showPasswords)}
                  >
                    {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type={showPasswords ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type={showPasswords ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>

              <Button type="submit" className="w-full">
                <Lock className="h-4 w-4 mr-2" />
                Change Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </CardTitle>
          <CardDescription>Configure how and when you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Notification Types</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Reminders</Label>
                    <p className="text-sm text-muted-foreground">Receive reminder emails for upcoming classes</p>
                  </div>
                  <Switch
                    checked={notifications.emailReminders}
                    onCheckedChange={(checked) => handleNotificationChange("emailReminders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Browser notifications for important updates</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("pushNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Class Updates</Label>
                    <p className="text-sm text-muted-foreground">Notifications about schedule changes</p>
                  </div>
                  <Switch
                    checked={notifications.classUpdates}
                    onCheckedChange={(checked) => handleNotificationChange("classUpdates", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>System Alerts</Label>
                    <p className="text-sm text-muted-foreground">Important system maintenance notifications</p>
                  </div>
                  <Switch
                    checked={notifications.systemAlerts}
                    onCheckedChange={(checked) => handleNotificationChange("systemAlerts", checked)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Notification Timing</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Reminder Lead Time</Label>
                  <Select
                    value={notifications.reminderLeadTime}
                    onValueChange={(value) => handleNotificationChange("reminderLeadTime", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Quiet Hours</Label>
                    <p className="text-sm text-muted-foreground">Disable notifications during specified hours</p>
                  </div>
                  <Switch
                    checked={notifications.quietHours}
                    onCheckedChange={(checked) => handleNotificationChange("quietHours", checked)}
                  />
                </div>

                {notifications.quietHours && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <Input
                        type="time"
                        value={notifications.quietStart}
                        onChange={(e) => handleNotificationChange("quietStart", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <Input
                        type="time"
                        value={notifications.quietEnd}
                        onChange={(e) => handleNotificationChange("quietEnd", e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Account Information
          </CardTitle>
          <CardDescription>View your account details and usage statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Account Status</Label>
                <p className="text-sm">Active</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Member Since</Label>
                <p className="text-sm">September 2014</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Last Login</Label>
                <p className="text-sm">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Total Classes</Label>
                <p className="text-sm">1,247</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Active Reminders</Label>
                <p className="text-sm">3</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Storage Used</Label>
                <p className="text-sm">2.4 GB of 10 GB</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
