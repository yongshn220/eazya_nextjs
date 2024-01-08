"use client"

import PostItem from "@containers/events/PostItem";
import useEventPostIds from "@containers/events/useEventPostIds";

export default function EventPosts() {
  const {page, setPage, data: eventPostIds, isLoading } = useEventPostIds()

  if (isLoading) {
    return (<div>loading</div>)
  }

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
