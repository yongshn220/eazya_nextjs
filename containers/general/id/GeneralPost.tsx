import {PostType, VoteType} from "@components/constants/enums";
import PostHeader from "@components/headers/PostHeader";
import CreateComment from "@components/post/comment/CreateComment";
import CommentList from "@components/post/comment/CommentList";
import {IGeneralPost} from "@models/collections/generalPost";
import getGeneralPostAction from "@actions/general/getGeneralPostAction";
import deleteGeneralPostAction from "@actions/general/deleteGeneralPostAction";
import {CreateVoteRequest} from "@models/requests/CreateVoteRequest";
import createVoteAction from "@actions/vote/createVoteAction";
import {IPostHeader} from "@models/types/postHeader";
import GeneralContent from "@containers/general/id/Content";

export default async function GeneralPost({id}) {
  const post: IGeneralPost = await getGeneralPostAction(id)

  async function handleDeletePost() {
    "use server"
    await deleteGeneralPostAction(id)
  }

  async function handleCreateVote(voteType: VoteType) {
    "use server"
    const req: CreateVoteRequest = {
      postType: PostType.GENERAL,
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

  let numberOfComments = 0
  post.comments.forEach(comment => {
    numberOfComments += comment.replies.length + 1
  })

  return (
    <section className="w-full flex flex-col">
      <PostHeader postHeaderData={postHeaderData}/>
      <GeneralContent post={post}/>
      <p className="text-lg mt-5">{`${numberOfComments} Comments`}</p>
      <CreateComment postType={post.type} postId={post.id}/>
      <CommentList postType={post.type} postId={post.id} comments={post.comments}/>
    </section>
  )
}
