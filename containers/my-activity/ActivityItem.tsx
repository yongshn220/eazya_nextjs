'use client'

import {Badge} from "@components/ui/badge"
import Link from 'next/link'
import {IUserActivity} from "@models/collections/userActivity";
import {
  CommunityPostType,
  CommunityType, isCommunityPostType,
  PostType,
  PostTypeToCommunityPostType,
  UserActivityType
} from "@components/constants/enums";
import {useEffect, useMemo, useState} from "react";
import getUserActivityAction from "@actions/userActivity/getUserActivityAction";
import {getCommunityPostPath, getPostPath} from "@components/constants/tags";


interface Props {
  id: string
}

export default function ActivityItem({id}: Props) {
  const [activity, setActivity] = useState<IUserActivity>(null)

  useEffect(() => {
    getUserActivityAction(id).then((res) => {
      if (res) {
        setActivity(res)
      }
    })
  }, [])

  const postLink = useMemo(() => {
    if (!activity) return "#"
    if (isCommunityPostType(activity.postType)) {
      return getCommunityPostPath(activity.postId, activity.postType, activity.communityType)
    }
    else {
      return getPostPath(activity.postId, activity.postType)
    }
  }, [activity])

  if (!activity) {
    return <></>
  }

  return (
    <div className="w-full cursor-pointer group">
      <Link href={postLink}>
        <div className="w-full flex-start flex-col gap-3 py-6">
          <div className="w-full flex-between">
            <div className="flex-center gap-2">
              <Badge variant="outline" className="border-gray-300">{activity.postType}</Badge>
              <p className="text-sm text-gray-500">
                You have created a <span className="default_blue_text">{getActivityNameByType(activity.userActivityType)}</span>.
              </p>
            </div>
            <p className="text-sm text-gray-500">
              {activity.createdAt}
            </p>
          </div>
          <p className={`font-semibold hover_text_blue`}>{activity.preview}</p>
        </div>
      </Link>
    </div>
  )
}

function getActivityNameByType(type: UserActivityType) {
  switch (type) {
    case UserActivityType.CREATE_POST: return "post"
    case UserActivityType.CREATE_COMMENT: return "comment"
    case UserActivityType.CREATE_REPLY: return "reply"
    default: return ""
  }
}
