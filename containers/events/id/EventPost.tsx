import PostHeader from "@components/headers/PostHeader";
import EventContent from "@containers/events/id/Content";
import CreateComment from "@components/post/comment/CreateComment";
import CommentList from "@components/post/comment/CommentList";
import {IEventPost} from "@models/collections/eventPost";
import {IPostHeader} from "@models/types/postHeader";
import deleteEventPostAction from "@actions/event/deleteEventPostAction";
import {CreateVoteRequest} from "@models/requests/CreateVoteRequest";
import {PostType, VoteType} from "@components/constants/enums";
import createVoteAction from "@actions/vote/createVoteAction";
import getEventPostAction from "@actions/event/getEventPostAction";
import {getNumOfCommentsInPost} from "@components/constants/helperFunctions";


export default async function EventPost({id}) {
  const post: IEventPost  = await getEventPostAction(id)
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

  const numberOfComments = getNumOfCommentsInPost(post)


  return (
    <section className="w-full flex flex-col">
      <PostHeader postHeaderData={postHeaderData}/>
      <EventContent post={post}/>
      <p className="text-lg mt-5">{`${numberOfComments} Comments`}</p>
      <CreateComment postType={post.type} postId={post.id}/>
      <CommentList postType={post.type} postId={post.id} comments={post.comments}/>
    </section>
  )
}

