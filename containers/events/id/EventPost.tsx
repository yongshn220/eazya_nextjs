import PostHeader from "@components/headers/PostHeader";
import EventContent from "@containers/events/id/Content";
import CreateComment from "@components/post/comment/CreateComment";
import CommentList from "@components/post/comment/CommentList";
import {IPostHeader} from "@models/types/postHeader";
import deleteEventPostAction from "@actions/event/deleteEventPostAction";
import {CreateVoteRequest} from "@models/requests/CreateVoteRequest";
import {PostType, VoteType} from "@components/constants/enums";
import createVoteAction from "@actions/vote/createVoteAction";
import {getNumOfCommentsInPost} from "@components/constants/helperFunctions";
import ImageFullViewer from "@components/image/ImageFullViewer";
import React from "react";
import {getEditFormPath} from "@components/constants/tags";


export default async function EventPost({post}) {
  if (!post) return <></>

  async function handleDeletePost() {
    "use server"
    await deleteEventPostAction(post.id)
  }

  async function handleCreateVote(voteType: VoteType) {
    "use server"
    const req: CreateVoteRequest = {
      postType: PostType.EVENT,
      postId: post.id,
      voteType: voteType,
    }

    await createVoteAction(req)
  }

  const postHeaderData: IPostHeader = {
    post,
    deletePostHandler: handleDeletePost,
    createVoteHandler: handleCreateVote,
    editHref: getEditFormPath(post.id, PostType.EVENT),
  }

  const numberOfComments = getNumOfCommentsInPost(post)


  return (
    <section className="w-full flex flex-col">
      <ImageFullViewer/>
      <PostHeader postHeaderData={postHeaderData}/>
      <EventContent post={post}/>
      <p className="text-lg mt-5">{`${numberOfComments} Comments`}</p>
      <CreateComment postType={post.type} postId={post.id}/>
      <CommentList postType={post.type} postId={post.id} comments={post.comments}/>
    </section>
  )
}

