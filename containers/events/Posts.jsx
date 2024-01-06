"use client"

import PostItem from "@containers/events/PostItem";
import useEventPostIds from "@containers/events/useEventPostIds";

export default function EventPosts() {
  const {page, setPage, data: eventPostIds, isLoading } = useEventPostIds()

  if (isLoading) {
    console.log("loading")
    return (<div>loading</div>)
  }

  console.log("postId", eventPostIds)

  return (
    <div className="grid_image">
      {
        eventPostIds.map(id => (
          <PostItem key={id} id={id}/>
        ))
      }
    </div>
  )
}
