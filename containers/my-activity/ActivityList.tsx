import ActivityItem from "@containers/my-activity/ActivityItem";
import {ActivityMenu, PostTypeToActivityMenu, UserActivityType} from "@components/constants/enums";
import {IUserActivity} from "@models/collections/userActivity";
import {useMemo} from "react";

interface Props {
  activities: Array<IUserActivity>;
  selectedMenu: ActivityMenu;
}

export default function ActivityList({activities, selectedMenu}: Props) {

  const filtered = useMemo(() => {
    return activities.filter((act: IUserActivity) => {
      if (selectedMenu === ActivityMenu.ALL) return true
      const userMenu = PostTypeToActivityMenu(act.postType)
      return userMenu === selectedMenu
    })
  }, [selectedMenu])

  return (
    <div className="w-full flex-center flex-col divide-y divide-gray-300 border-b border-gray-300">
      {
        filtered.map((act: IUserActivity) => (
          <ActivityItem key={act.id} activity={act}/>
        ))
      }
    </div>
  )
}
