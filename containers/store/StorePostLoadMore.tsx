"use client"

import Lottie from "lottie-react";
import loadingAnimation from '@components/constants/animation/loadingCircle.json'
import {useInView} from "react-intersection-observer";
import {useEffect, useState} from "react";
import getEventPostIdsAction from "@actions/event/getEventPostIdsAction";
import EventPostItem from "@containers/events/EventPostItem";
import {IEventPost} from "@models/collections/eventPost";
import getEventPostAction from "@actions/event/getEventPostAction";
import {DEFAULT_PAGE_LENGTH} from "@components/constants/values";
import {IStorePost} from "@models/collections/storePost";
import getStorePostIdsAction from "@actions/store/getStorePostIdsAction";
import getStorePostAction from "@actions/store/getStorePostAction";
import StorePostItem from "@containers/store/StorePostItem";

export default function StorePostLoadMore() {
  const {ref, inView} = useInView()
  const [posts, setPosts] = useState<Array<IStorePost>>([])
  const [page, setPage] = useState<number>(2)
  const [isDone, setIsDone] = useState<boolean>(false)

  useEffect(() => {
    if (inView) {
      getStorePostIdsAction(page).then((ids: Array<string>) => {
        ids.map(id => getStorePostAction(id).then((post) => {
          if (post)
            setPosts((prev) => [...prev, post])
        }))
        if (ids.length === DEFAULT_PAGE_LENGTH.STORE) {
          setPage(prev => prev + 1)
        }
        else {
          setIsDone(true)
        }
      })
    }
  }, [inView])

  return (
    <div className="flex-center flex-col">
      <div className="grid_image">
        {
          posts.map(post => (
            <StorePostItem key={post.id} post={post}/>
          ))
        }
      </div>
      {
        !isDone &&
        <div ref={ref}>
          <Lottie animationData={loadingAnimation} loop={true} className="w-[100px] h-[100px]"/>
        </div>
      }
    </div>
  )
}
