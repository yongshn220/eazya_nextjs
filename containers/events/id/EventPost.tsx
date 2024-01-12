import PostHeader from "@components/headers/PostHeader";
import EventContent from "@containers/events/id/Content";
import CreateComment from "@components/post/comment/CreateComment";
import CommentList from "@components/post/comment/CommentList";
import {getEventPostApi} from "@services/eventPost";
import {IEventPost} from "@models/collections/eventPost";
import {IPostHeader} from "@models/types/postHeader";
import deleteEventPostAction from "@actions/event/deleteEventAction";


export default async function EventPost({id}) {
  const post: IEventPost  = await getEventPostApi(id)

  async function handlePostDelete() {
    "use server"
    await deleteEventPostAction(id)
  }

  const postHeaderData: IPostHeader = {
    post,
    postDeleteHandler: handlePostDelete,
    deleteHref: "/events",
    editHref: "#",
  }

  return (
    <section className="w-full flex flex-col">
      <PostHeader postHeaderData={postHeaderData}/>
      <EventContent post={post}/>
      <CreateComment postType={post.type} postId={post.id}/>
      <CommentList postType={post.type} postId={post.id} comments={post.comments}/>
    </section>
  )
}

