"use client"

import Lottie from "lottie-react";
import loadingAnimation from '@components/constants/animation/loadingCircle.json'
import {useInView} from "react-intersection-observer";
import {useEffect, useState} from "react";
import {DEFAULT_PAGE_LENGTH} from "@components/constants/values";
import {IUserActivity} from "@models/collections/userActivity";
import getUserActivityIdsAction from "@actions/userActivity/getUserActivityIdsAction";
import ActivityItem from "@containers/my-activity/ActivityItem";
import getUserActivityAction from "@actions/userActivity/getUserActivityAction";

export default function ActivityLoadMore({activityMenu}) {
  const {ref, inView} = useInView()
  const [ids, setIds] = useState<Array<string>>([])
  const [page, setPage] = useState<number>(2)
  const [isDone, setIsDone] = useState<boolean>(false)

  useEffect(() => {
    setIds([])
    setIsDone(false)
    setPage(2)
  }, [activityMenu])

  useEffect(() => {
    if (inView) {
      getUserActivityIdsAction(activityMenu, page).then((res: Array<string>) => {
        setIds((prev) => ([...prev, ...res]))

        if (res.length === DEFAULT_PAGE_LENGTH.USER_ACTIVITY) {
          setPage(prev => prev + 1)
        }
        else {
          setIsDone(true)
        }
      })
    }
  }, [inView])

  return (
    <div className="divide-y">
      <div className="w-full flex-center flex-col divide-y divide-gray-300 border-b border-gray-300">
        {
          ids.map((id: string) => (
            <ActivityItem key={id} id={id}/>
          ))
        }
      </div>
      {
        !isDone &&
        <div ref={ref} className="flex-center">
          <Lottie animationData={loadingAnimation} loop={true} className="w-[100px] h-[100px]"/>
        </div>
      }
    </div>
  )
}
