'use client'

import {useEffect, useState} from "react";
import {UserActivityMenu} from "@components/constants/enums";
import {IUserActivity} from "@models/collections/userActivity";
import ActivityItem from "@containers/my-activity/ActivityItem";
import getUserActivityIdsAction from "@actions/userActivity/getUserActivityIdsAction";
import getUserActivityAction from "@actions/userActivity/getUserActivityAction";
import ActivityLoadMore from "@containers/my-activity/ActivityLoadMore";

interface Props {
  activityIds: Array<string>
}

export default function ActivityContent({activityIds}: Props) {
  const [menu, setMenu] = useState<UserActivityMenu>(UserActivityMenu.ALL)
  const [ids, setIds] = useState<Array<string>>(activityIds)

  function handleMenuChange(newMenu: UserActivityMenu) {
    if (menu !== newMenu) {
      getUserActivityIdsAction(newMenu, 1).then((res) => {
        setIds(res)
      })
    }
    setMenu(newMenu)
  }

  return (
    <>
      <div className="flex-start gap-10 mt-16 font-semibold pb-2 border-b border-gray-300 ">
        {
          Object.values(UserActivityMenu).map(menuItem => (
            <p key={menuItem}
               className={`cursor-pointer ${(menu === menuItem)? "default_blue_text" : ""}`}
               onClick={() => handleMenuChange(menuItem)}>{menuItem}
            </p>
          ))
        }
      </div>
      <div className="w-full flex-center flex-col divide-y divide-gray-300 border-b border-gray-300">
        {
          ids.map((id: string) => (
            <ActivityItem key={id} id={id}/>
          ))
        }
      </div>
      <ActivityLoadMore activityMenu={menu}/>
    </>
  )
}
