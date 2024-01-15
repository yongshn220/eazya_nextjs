import PostHeader from "@components/headers/PostHeader";
import EventContent from "@containers/events/id/Content";
import CreateComment from "@components/post/comment/CreateComment";
import CommentList from "@components/post/comment/CommentList";
import {getEventPostApi} from "@services/eventPost";
import {IEventPost} from "@models/collections/eventPost";
import {IPostHeader} from "@models/types/postHeader";
import deleteEventPostAction from "@actions/event/deleteEventAction";
import {CreateVoteRequest} from "@models/requests/CreateVoteRequest";
import {PostType, VoteType} from "@components/constants/enums";
import createVoteAction from "@actions/vote/createVoteAction";
import {GetEventAction} from "@actions/event/getEventAction";


export default async function EventPost({id}) {
  const post: IEventPost  = await GetEventAction(id)
  if (!post) return <></>

  async function handleDeletePost() {
    "use server"
    await deleteEventPostAction(id)
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

