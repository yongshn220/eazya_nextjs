"use client"

import Lottie from "lottie-react";
import loadingAnimation from '@components/constants/animation/loadingCircle.json'
import {useInView} from "react-intersection-observer";
import {useEffect, useState} from "react";
import getNotificationsAction from "@actions/notification/getNotificationsAction";
import NotificationItem from "@components/nav/NotificationItem";
import {INotification} from "@models/collections/notification";
import {DEFAULT_PAGE_LENGTH} from "@components/constants/values";

export default function NotificationLoadMore() {
  const {ref, inView} = useInView()
  const [notifications, setNotifications] = useState<Array<INotification>>([])
  const [page, setPage] = useState<number>(2)
  const [isDone, setIsDone] = useState<boolean>(false)


  useEffect(() => {
    if (inView) {
      getNotificationsAction(page).then((res: Array<INotification>) => {
        setNotifications((prev) => ([...prev, ...res]))

        if (res.length === DEFAULT_PAGE_LENGTH.NOTIFICATION) {
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
      {
        notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification}/>
        ))
      }
      {
        !isDone &&
        <div ref={ref} className="flex-center">
          <Lottie animationData={loadingAnimation} loop={true} className="w-[100px] h-[100px]"/>
        </div>
      }
    </div>
  )
}
