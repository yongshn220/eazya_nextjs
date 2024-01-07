import PostHeader from "@components/headers/PostHeader";
import Content from "@containers/events/id/Content";
import GeneralContent from "@components/post/GeneralContent";
import StoreContent from "@components/post/StoreContent";
import CreateComment from "@components/post/comment/CreateComment";
import CommentList from "@components/post/comment/CommentList";
import {PostType} from "@components/constants/enums";


export default function Post({post}) {
  const subtitle = post.tag?? ""

  // todo: post.authorId should not be visible in frontend. Should be handled differently later.
  return (
    <section className="w-full flex flex-col">
      <PostHeader title={post.type} subtitle={subtitle} post={post}/>
      <>
        {post.type === PostType.EVENT && <Content post={post}/>}
        {post.type === PostType.GENERAL && <GeneralContent post={[post]}/>}
        {post.type === PostType.STORE && <StoreContent post={[post]}/>}
      </>
      <CreateComment/>
      <CommentList/>
    </section>
  )
}
