'use client'

import {DropdownMenuItem} from "@components/ui/dropdown-menu";
import {Badge} from "@components/ui/badge";
import {INotification} from "@models/collections/notification";
import {getMessageByNotificationType} from "@components/nav/helperFunction";
import Link from "next/link";
import {isCommunityPostType} from "@components/constants/enums";
import {getCommunityPostPath, getPostPath} from "@components/constants/tags";
import {useEffect, useMemo} from "react";
import readNotificationAction from "@actions/notification/readNotificationAction";


interface Props {
  notification: INotification
}

export default function NotificationItem({notification}: Props) {

  const pageLink = useMemo(() => {
      if (!notification) return "#"
      return isCommunityPostType(notification.postType)
      ? getCommunityPostPath(notification.postId, notification.postType, notification.communityType)
      : getPostPath(notification.postId, notification.postType)
  }, [notification])

  useEffect(() => {
    if (!notification.isRead) {
      console.log("not read")
      readNotificationAction(notification.id).then()
    }
  }, [])

  return (
    <Link href={pageLink}>
      <DropdownMenuItem className="cursor-pointer">
        <div className={`w-full flex-start flex-col p-2 gap-2 ${!notification.isRead && "bg-blue-50 rounded-lg"}`}>
          <div className="w-full flex-between">
            <Badge variant="outline" className="border-gray-300">{notification.postType}</Badge>
            <div className="text-xs text-gray-500">{notification.createdAt}</div>
          </div>
          <div className="w-full flex-start overflow-hidden">
            <p className="font-semibold line-clamp-2">
              {notification.preview}
            </p>
          </div>
          <p className="text-xs text-gray-600">
            {getMessageByNotificationType(notification.notificationType)}
          </p>
        </div>
      </DropdownMenuItem>
    </Link>
  )
}
