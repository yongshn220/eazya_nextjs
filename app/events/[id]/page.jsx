"use client"

import EventPost from "@containers/Events/id/EventPost";
import {useSearchParams} from "next/navigation";

export default function EventPostPage({ params }) {
  const postId = params.id

  return (
    <EventPost id={postId}/>
  )
}
