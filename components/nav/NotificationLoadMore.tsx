"use client"

import Lottie from "lottie-react";
import loadingAnimation from '@components/constants/animation/loadingCircle.json'
import {useInView} from "react-intersection-observer";
import {useEffect, useState} from "react";
import getNotificationsAction from "@actions/notification/getNotificationsAction";
import NotificationItem from "@components/nav/NotificationItem";
import {INotification} from "@models/collections/notification";

let page = 2
export default function NotificationLoadMore() {
  const {ref, inView} = useInView()
  const [notifications, setNotifications] = useState<Array<INotification>>([])

  useEffect(() => {
    if (inView) {
      getNotificationsAction(page).then((res: Array<INotification>) => {
        setNotifications((prev) => ([...prev, ...res]))
        page += 1
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
      <div ref={ref}>
        <Lottie animationData={loadingAnimation} loop={true} className="w-[100px] h-[100px]"/>
      </div>
    </div>
  )
}
