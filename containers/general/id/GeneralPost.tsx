import {PostType, VoteType} from "@components/constants/enums";
import PostHeader from "@components/headers/PostHeader";
import CreateComment from "@components/post/comment/CreateComment";
import CommentList from "@components/post/comment/CommentList";
import {IGeneralPost} from "@models/collections/generalPost";
import getCommunityPostAction from "@actions/community/getCommunityPostAction";
import deleteCommunityPostAction from "@actions/community/deleteCommunityPostAction";
import {CreateVoteRequest} from "@models/requests/CreateVoteRequest";
import createVoteAction from "@actions/vote/createVoteAction";
import {IPostHeader} from "@models/types/postHeader";
import GeneralContent from "@containers/general/id/Content";
import {getNumOfCommentsInPost} from "@components/constants/helperFunctions";

export default async function GeneralPost({id, type}) {
  const post: IGeneralPost = await getCommunityPostAction(id)

  async function handleDeletePost() {
    "use server"
    await deleteCommunityPostAction(id, type)
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

  const numberOfComments = getNumOfCommentsInPost(post)

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
