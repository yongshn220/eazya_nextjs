"use client"

import Lottie from "lottie-react";
import loadingAnimation from '@components/constants/animation/loadingCircle.json'
import {useInView} from "react-intersection-observer";
import {useEffect, useState} from "react";
import getEventPostAction from "@actions/event/getEventPostAction";
import {DEFAULT_PAGE_LENGTH} from "@components/constants/values";
import {ICommunityPost} from "@models/union/union";
import getCommunityPostIdsAction from "@actions/community/getCommunityPostIdsAction";
import {CommunityType, PostType} from "@components/constants/enums";
import CommunityDetailPostItem from "@components/post/community/CommunityDetailPostItem";
import getCommunityPostAction from "@actions/community/getCommunityPostAction";

interface Props {
  postType: PostType;
  communityType: CommunityType;
}

export default function CommunityPostLoadMore({postType, communityType}: Props) {
  const {ref, inView} = useInView()
  const [posts, setPosts] = useState<Array<ICommunityPost>>([])
  const [page, setPage] = useState<number>(2)
  const [isDone, setIsDone] = useState<boolean>(false)

  useEffect(() => {
    if (inView) {
      getCommunityPostIdsAction(postType, communityType, page).then((ids: Array<string>) => {
        ids.map(id => getCommunityPostAction(id, postType).then((post) => {
          if (post)
            setPosts((prev) => [...prev, post])
        }))
        if (ids.length === DEFAULT_PAGE_LENGTH.EVENT) {
          setPage(prev => prev + 1)
        }
        else {
          setIsDone(true)
        }
      })
    }
  }, [inView])

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-300 border-t border-gray-300 ">
        {
          posts.map(post => (
            <CommunityDetailPostItem key={post.id} postType={postType} communityType={communityType} post={post}/>
          ))
        }
      </ul>
      {
        !isDone &&
        <div ref={ref} className="w-full flex-center">
          <Lottie animationData={loadingAnimation} loop={true} className="w-[100px] h-[100px]"/>
        </div>
      }
    </div>
  )
}
