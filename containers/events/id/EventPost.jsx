"use client"

import useEventPost from "@containers/events/useEventPost";
import LoadingCircle from "@components/animation/LoadingCircle";
import PostHeader from "@components/headers/PostHeader";
import EventContent from "@containers/events/id/Content";
import CreateComment from "@components/post/comment/CreateComment";
import CommentList from "@components/post/comment/CommentList";
import { useRouter } from 'next/navigation'
import useDeleteEventPost from "@containers/events/id/useDeleteEventPost";
import {useState} from "react";

export default function EventPost({id}) {
  const router = useRouter()
  const {post, isLoading} = useEventPost(id)
  const deleteEventMutation = useDeleteEventPost()

  const {comment, setComment} = useState({
    content: "",
    isSecret: false
  })

  if (isLoading) {
    return (<LoadingCircle/>)
  }

  function handlePostDelete() {
    deleteEventMutation.mutate(id)
    router.push('/events')
  }



  return (
    <section className="w-full flex flex-col">
      <PostHeader post={post} handlePostDelete={handlePostDelete}/>
      <EventContent post={post}/>
      <CreateComment comment={comment} setComment={setComment}/>
      <CommentList/>
    </section>
  )
}

