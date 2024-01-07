import PostHeader from "@components/headers/PostHeader";
import EventContent from "@components/post/EventContent";
import GeneralContent from "@components/post/GeneralContent";
import StoreContent from "@components/post/StoreContent";
import CreateComment from "@components/post/comment/CreateComment";
import CommentList from "@components/post/comment/CommentList";
import {PostType} from "@components/constants/enums";


export default function Post({type, post}) {
  const subtitle = post.tag?? ""

  // todo: post.authorId should not be visible in frontend. Should be handled differently later.
  return (
    <section className="w-full flex flex-col">
      <PostHeader title={type} subtitle={subtitle} authorId={post.authorId}/>
      <Contents type={type} post={post}/>
      <CreateComment/>
      <CommentList/>
    </section>
  )
}

function Contents({type, post}) {
  return (
    <>
      {type === PostType.EVENT && <EventContent post={post}/>}
      {type === PostType.GENERAL && <GeneralContent/>}
      {type === PostType.STORE && <StoreContent/>}
    </>
  )
}
