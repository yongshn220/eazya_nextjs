"use client"

import NotificationIcon from "@public/assets/icons/notification.svg";
import {DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@components/ui/dropdown-menu";
import {useEffect, useMemo, useState} from "react";
import getNotificationsAction from "@actions/notification/getNotificationsAction";
import {INotification} from "@models/collections/notification";
import NotificationLoadMore from "@components/nav/NotificationLoadMore";
import NotificationItem from "@components/nav/NotificationItem";
import {useSession} from "@node_modules/next-auth/react";


export default function NavNotificationDropDown() {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()
  const [notifications, setNotifications] = useState([])

  if (!session) return <></>

  useEffect(() => {
    getNotificationsAction(1).then((results) => {
      results && setNotifications(results)
    })
  }, [open])


  const unreadNotificationCount = useMemo(() => {
    return notifications.filter((noti) => !noti.isRead).length
  }, [notifications])

  return (
    <div className="h-full">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className="h-full">
          <div className="relative flex-center h-full hover:scale-[1.1] cursor-pointer">
            <NotificationIcon/>
            {
              unreadNotificationCount > 0 &&
              <div className="absolute flex-center left-3 top-[-5px]  bg-red-500 w-6 h-6 rounded-full border border-white">
                <p className="text-white font-semibold text-xs" >{unreadNotificationCount}</p>
              </div>
            }
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-96 max-h-[80vh] overflow-scroll no-scrollbar">
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
