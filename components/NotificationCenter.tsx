"use client";



import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
interface Notification {
  id: string
  title: string
  message: string
  read: boolean
}
export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", title: "Account Update", message: "Your account balance has been updated.", read: false },
    { id: "2", title: "Security Alert", message: "A new device has logged into your account.", read: false },
    { id: "3", title: "Loan Approval", message: "Your loan application has been approved.", read: true },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} onSelect={() => markAsRead(notification.id)}>
            <div className={`w-full ${notification.read ? "opacity-50" : ""}`}>
              <div className="font-medium">{notification.title}</div>
              <div className="text-sm text-gray-500">{notification.message}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

