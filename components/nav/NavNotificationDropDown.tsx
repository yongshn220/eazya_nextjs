"use client"

import NotificationIcon from "@public/assets/icons/notification.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@components/ui/dropdown-menu";
import {Badge} from "@components/ui/badge";
import {useEffect, useState} from "react";
import getNotificationsAction from "@actions/notification/getNotificationsAction";
import LoadingCircle from "@components/animation/LoadingCircle";
import {INotification} from "@models/collections/notification";
import {NotificationType} from "@components/constants/enums";

export default function NavNotificationDropDown() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (open) {
      setIsLoading(true)
      getNotificationsAction().then((results) => {
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
        <DropdownMenuContent className="w-96 p-2">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          {
            isLoading ?
            <LoadingCircle/>
            :
            <div className="divide-y">
            {
              notifications.map(notification => (
                <NotificationItem key={notification.id} notification={notification}/>
              ))
            }
            </div>
          }
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
          {notification.postTitle}
        </p>
        <p className="text-xs text-gray-600">
          {getMessageByNotificationType(notification.notificationType)}
        </p>
      </div>
    </DropdownMenuItem>
  )
}


function getMessageByNotificationType(type: NotificationType) {
  switch(type) {
    case NotificationType.COMMENT_ON_POST: return "Someone added a comment on your post."
    case NotificationType.REPLY_ON_COMMENT: return "Someone added a reply on your comment."
    case NotificationType.REPLY_ON_REPLY: return "Someone added a reply on your reply."
    case NotificationType.UPVOTE_ON_POST: return "Someone upvoted on your post."
    case NotificationType.UPVOTE_ON_COMMENT: return "Someone upvoted on your comment."
    case NotificationType.UPVOTE_ON_REPLY: return "Someone upvoted on your reply."
    case NotificationType.DOWNVOTE_ON_POST: return "Someone downvoted on your post."
    case NotificationType.DOWNVOTE_ON_COMMENT: return "Someone downvoted on your comment."
    case NotificationType.DOWNVOTE_ON_REPLY: return "Someone downvoted on your reply."
    default: return ""
  }
}
