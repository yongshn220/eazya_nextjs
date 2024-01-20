import {Badge} from "@components/ui/badge"
import Link from 'next/link'
import {IUserActivity} from "@models/collections/userActivity";
import {UserActivityType} from "@components/constants/enums";

interface Props {
  activity: IUserActivity
}

export default function ActivityItem({activity}: Props) {
  return (
    <div className="w-full cursor-pointer group">
      <Link href="#">
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
