"use client"

import NotificationIcon from "@public/assets/icons/notification.svg";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@components/ui/dropdown-menu";
import {Badge} from "@components/ui/badge";
import {useEffect, useState} from "react";
import getNotificationsAction from "@actions/notification/getNotificationsAction";
import {INotification} from "@models/collections/notification";
import NotificationLoadMore from "@components/nav/NotificationLoadMore";
import {getMessageByNotificationType} from "@components/nav/helperFunction";


export default function NavNotificationDropDown() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (open) {
      setIsLoading(true)
      getNotificationsAction(1).then((results) => {
        results && setNotifications(results)
        setIsLoading(false)
      })
    }
  }, [open])


  return (
    <div className="h-full">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className="h-full">
          <div className="flex-center h-full hover:scale-[1.1] cursor-pointer">
            <NotificationIcon/>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-96 p-2 max-h-[80vh] overflow-scroll no-scrollbar">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <div className="divide-y">
          {
            notifications.map(notification => (
              <NotificationItem key={notification.id} notification={notification}/>
            ))
          }
          <NotificationLoadMore/>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

interface Props {
  notification: INotification
}

function NotificationItem({notification}: Props) {
  return (
    <DropdownMenuItem className="cursor-pointer">
      <div className="w-full flex-start flex-col py-3 gap-2">
        <div className="w-full flex-between">
          <Badge variant="outline" className="border-gray-300">{notification.postType}</Badge>
          <div className="text-xs text-gray-500">{notification.createdAt}</div>
        </div>
        <p className="w-full flex-start font-semibold line-clamp-1">
          {notification.preview}
        </p>
        <p className="text-xs text-gray-600">
          {getMessageByNotificationType(notification.notificationType)}
        </p>
      </div>
    </DropdownMenuItem>
  )
}
