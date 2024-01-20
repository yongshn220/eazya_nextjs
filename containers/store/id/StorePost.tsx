import StoreContent from "@containers/store/id/Content";
import PostHeader from "@components/headers/PostHeader";
import CreateComment from "@components/post/comment/CreateComment";
import CommentList from "@components/post/comment/CommentList";
import {IStorePost} from "@models/collections/storePost";
import getStorePostAction from "@actions/store/getStorePostAction";
import deleteStorePostAction from "@actions/store/deleteStorePostAction";
import {PostType, VoteType} from "@components/constants/enums";
import {CreateVoteRequest} from "@models/requests/CreateVoteRequest";
import createVoteAction from "@actions/vote/createVoteAction";
import {IPostHeader} from "@models/types/postHeader";
import {getNumOfCommentsInPost} from "@components/constants/helperFunctions";
import ImageFullViewer from "@components/image/ImageFullViewer";
import React from "react";
import {getEditFormPath} from "@components/constants/tags";

export default async function StorePost({id}) {
  const post: IStorePost = await getStorePostAction(id)
  if (!post) return <></>

  async function handleDeletePost() {
    "use server"
    await deleteStorePostAction(id)
  }

  async function handleCreateVote(voteType: VoteType) {
    "use server"

    const req: CreateVoteRequest = {
      postType: PostType.STORE,
      postId: post.id,
      voteType: voteType,
    }

    await createVoteAction(req)
  }

  const postHeaderData: IPostHeader = {
    post,
    deletePostHandler: handleDeletePost,
    createVoteHandler: handleCreateVote,
    editHref: getEditFormPath(post.id, PostType.STORE),
  }

  const numberOfComments = getNumOfCommentsInPost(post)

  return (
    <section className="w-full flex flex-col">
      <ImageFullViewer/>
      <PostHeader postHeaderData={postHeaderData}/>
      <StoreContent post={post}/>
      <p className="text-lg mt-5">{`${numberOfComments} Comments`}</p>
      <CreateComment postType={post.type} postId={post.id}/>
      <CommentList postType={post.type} postId={post.id} comments={post.comments}/>
    </section>
  )
}
