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
import NotificationItem from "@components/nav/NotificationItem";


export default function NavNotificationDropDown() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (open) {
      getNotificationsAction(1).then((results) => {
        results && setNotifications(results)
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
