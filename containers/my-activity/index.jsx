"use client"

import Image from "next/image";
import {useSession} from "next-auth/react";
import {Button} from "@components/ui/button";
import {useState} from "react";
import {highlightedTextColor} from "@components/constants/values";
import ActivityList from "@containers/my-activity/ActivityList";

const ActivityMenu = {
  RECENT: "Recent",
  EVENT: "Event",
  GENERAL: "General",
  BUY_SELL: "Buy & Sell",
}

export default function MyActivity() {
  const {data: session} = useSession()
  const [selectedActivity, setSelectedActivity] = useState(ActivityMenu.RECENT)

  return (
    <section className="w-full">
      <p className="text-xl font-bold pb-3 border-b">
        My Activity
      </p>

      <div className="flex-between glassmorphism mt-4">
        <div className="flex-center gap-4">
          <Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="profile" />
          <p className="font-semibold">yongshn220@gmail.com</p>
        </div>
        <Button variant="outline">My Account</Button>
      </div>

      <div className="flex-start gap-10 mt-16 font-semibold pb-2 border-b border-gray-300 ">
        {
          Object.values(ActivityMenu).map(activity => {
            const textColor = selectedActivity === activity? highlightedTextColor : ""
            return <p className={`${textColor} cursor-pointer`} onClick={() => setSelectedActivity(activity)}>{activity}</p>
          })
        }
      </div>
      
      <ActivityList/>
    </section>
  )
}
