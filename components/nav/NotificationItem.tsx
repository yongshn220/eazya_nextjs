'use client'

import {DropdownMenuItem} from "@components/ui/dropdown-menu";
import {Badge} from "@components/ui/badge";
import {INotification} from "@models/collections/notification";
import {getMessageByNotificationType} from "@components/nav/helperFunction";
import Link from "next/link";
import {isCommunityPostType} from "@components/constants/enums";
import {getCommunityPostPath, getPostPath} from "@components/constants/tags";
import {useMemo} from "react";


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

  return (
    <Link href={pageLink}>
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
    </Link>
  )
}
