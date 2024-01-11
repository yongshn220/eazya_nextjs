import useEventPost from "@containers/events/useEventPost";
import LoadingCircle from "@components/animation/LoadingCircle";
import PostHeader from "@components/headers/PostHeader";
import EventContent from "@containers/events/id/Content";
import CreateComment from "@components/post/comment/CreateComment";
import CommentList from "@components/post/comment/CommentList";
// import { useRouter } from 'next/navigation'
import useDeleteEventPost from "@containers/events/id/useDeleteEventPost";
import {getEventPostApi} from "@services/eventPost";

export default async function EventPost({id}) {
  const post = await getEventPostApi(id)


  async function handlePostDelete() {
    "use server"
    // deleteEventMutation.mutate(id)
    // router.push('/events')
  }

  return (
    <section className="w-full flex flex-col">
      <PostHeader post={post} handlePostDelete={handlePostDelete}/>
      <EventContent post={post}/>
      <CreateComment postType={post.type} postId={post.id}/>
      <CommentList postType={post.type} postId={post.id} comments={post.comments}/>
    </section>
  )
}

