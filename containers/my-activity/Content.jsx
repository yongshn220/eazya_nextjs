'use client'

import {highlightedTextColor} from "@components/constants/values";
import ActivityList from "@containers/my-activity/ActivityList";
import {useState} from "react";
import {ActivityMenu} from "@components/constants/enums";

export default function ActivityContent({activities}) {
  const [selectedActivityMenu, setSelectedActivityMenu] = useState(ActivityMenu.ALL)

  return (
    <>
      <div className="flex-start gap-10 mt-16 font-semibold pb-2 border-b border-gray-300 ">
        {
          Object.values(ActivityMenu).map(menuItem => {
            const textColor = selectedActivityMenu === menuItem ? highlightedTextColor : ""
            return <p key={menuItem} className={`${textColor} cursor-pointer`}
                      onClick={() => setSelectedActivityMenu(menuItem)}>{menuItem}</p>
          })
        }
      </div>
      <ActivityList activities={activities} selectedMenu={selectedActivityMenu}/>
    </>
  )
}
