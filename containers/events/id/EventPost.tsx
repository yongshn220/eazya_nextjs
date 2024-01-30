import EventContent from "@containers/events/id/Content";
import CreateComment from "@components/post/comment/CreateComment";
import CommentList from "@components/post/comment/CommentList";
import {getNumOfCommentsInPost} from "@components/constants/helperFunctions";
import ImageFullViewer from "@components/image/ImageFullViewer";
import React from "react";
import EventPostHeader from "@containers/events/id/EvnetPostHeader";


export default async function EventPost({post}) {
  if (!post) return <></>

  const numberOfComments = getNumOfCommentsInPost(post)

  return (
    <section className="w-full flex flex-col">
      <ImageFullViewer/>
      <EventPostHeader post={post}/>
      <EventContent post={post}/>
      <p className="text-lg mt-5">{`${numberOfComments} Comments`}</p>
      <CreateComment postType={post.type} postId={post.id}/>
      <CommentList postType={post.type} postId={post.id} comments={post.comments}/>
    </section>
  )
}

