import {VoteType} from "@components/constants/enums";
import PostHeader from "@components/headers/PostHeader";
import CreateComment from "@components/post/comment/CreateComment";
import CommentList from "@components/post/comment/CommentList";
import getCommunityPostAction from "@actions/community/getCommunityPostAction";
import deleteCommunityPostAction from "@actions/community/deleteCommunityPostAction";
import {CreateVoteRequest} from "@models/requests/CreateVoteRequest";
import createVoteAction from "@actions/vote/createVoteAction";
import {IPostHeader} from "@models/types/postHeader";
import {getNumOfCommentsInPost} from "@components/constants/helperFunctions";
import CommunityContent from "@components/post/community/CommunityContent";
import {getCommunityEditFormPath} from "@components/constants/tags";
import {ICommunityPost} from "@models/union/union";
import React from "react";

export default async function CommunityPost({postType, communityType, postId}) {
  const post: ICommunityPost = await getCommunityPostAction(postId, postType)
  if (!post) return <></>

  async function handleDeletePost() {
    "use server"
    await deleteCommunityPostAction(postId, postType, communityType)
  }

  async function handleCreateVote(voteType: VoteType) {
    "use server"
    const req: CreateVoteRequest = {
      postType: postType,
      postId: post.id,
      voteType: voteType,
    }
    await createVoteAction(req)
  }

  const postHeaderData: IPostHeader = {
    post,
    deletePostHandler: handleDeletePost,
    createVoteHandler: handleCreateVote,
    editHref: getCommunityEditFormPath(postId, postType, communityType),
  }

  const numberOfComments = getNumOfCommentsInPost(post)

  return (
    <section className="w-full flex flex-col">
      <PostHeader postHeaderData={postHeaderData}/>
      <CommunityContent post={post}/>
      <p className="text-lg mt-5">{`${numberOfComments} Comments`}</p>
      <CreateComment postType={post.type} postId={post.id}/>
      <CommentList postType={post.type} postId={post.id} comments={post.comments}/>
    </section>
  )
}
