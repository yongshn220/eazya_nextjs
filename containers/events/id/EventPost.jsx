import Post from "@components/post/Post";
import useEventPost from "@containers/events/useEventPost";
import LoadingCircle from "@components/animation/LoadingCircle";
import PostHeader from "@components/headers/PostHeader";
import {PostType} from "@components/constants/enums";
import EventContent from "@containers/events/id/Content";
import GeneralContent from "@components/post/GeneralContent";
import StoreContent from "@components/post/StoreContent";
import CreateComment from "@components/post/comment/CreateComment";
import CommentList from "@components/post/comment/CommentList";

export default function EventPost({id}) {
  const {post, isLoading} = useEventPost(id)

  if (isLoading) {
    return (<LoadingCircle/>)
  }

  console.log(post)

  return (
    <section className="w-full flex flex-col">
      <PostHeader title={post.type} subtitle={post.tag?? ""} post={post}/>
      <EventContent post={post}/>
      <CreateComment/>
      <CommentList/>
    </section>
  )
}
