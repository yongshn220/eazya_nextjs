import StoreContent from "@containers/store/id/Content";
import CreateComment from "@components/post/comment/CreateComment";
import CommentList from "@components/post/comment/CommentList";
import {IStorePost} from "@models/collections/storePost";
import getStorePostAction from "@actions/store/getStorePostAction";
import {getNumOfCommentsInPost} from "@components/constants/helperFunctions";
import ImageFullViewer from "@components/image/ImageFullViewer";
import React from "react";
import StorePostHeader from "@containers/store/id/StorePostHeader";


export default async function StorePost({id}) {
  const post: IStorePost = await getStorePostAction(id)
  if (!post) return <></>

  const numberOfComments = getNumOfCommentsInPost(post)

  return (
    <section className="w-full flex flex-col">
      <ImageFullViewer/>
      <StorePostHeader post={post}/>
      <StoreContent post={post}/>
      <p className="text-lg mt-5">{`${numberOfComments} Comments`}</p>
      <CreateComment postType={post.type} postId={post.id}/>
      <CommentList postType={post.type} postId={post.id} comments={post.comments}/>
    </section>
  )
}
