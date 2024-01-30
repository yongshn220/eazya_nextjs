'use client'

import PostHeader from "@components/headers/PostHeader";
import deleteEventPostAction from "@actions/event/deleteEventPostAction";
import {PostType, VoteType} from "@components/constants/enums";
import {CreateVoteRequest} from "@models/requests/CreateVoteRequest";
import createVoteAction from "@actions/vote/createVoteAction";
import {IPostHeader} from "@models/types/postHeader";
import {getEditFormPath, getHomePath} from "@components/constants/tags";
import {StatusCodes} from "@node_modules/http-status-codes";
import {useRouter} from "@node_modules/next/navigation";
import {deleteFile} from "@components/constants/firebaseHelper";

export default function EventPostHeader({post}) {
  const router = useRouter()

  async function handleDeletePost() {
    const res = await deleteEventPostAction(post.id)
    if (res.status === StatusCodes.OK) {
      await deleteFile(post.image)
    }
    else console.log(res.status)

    router.replace(getHomePath(PostType.EVENT))
  }

  async function handleCreateVote(voteType: VoteType) {
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
    editHref: getEditFormPath(post.id, PostType.EVENT),
  }

  return (
    <PostHeader postHeaderData={postHeaderData}/>
  )
}
