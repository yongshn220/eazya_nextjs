
'use client'

import PostHeader from "@components/headers/PostHeader";
import {IPostHeader} from "@models/types/postHeader";
import {getEditFormPath, getHomePath} from "@components/constants/tags";
import {PostType, VoteType} from "@components/constants/enums";
import deleteStorePostAction from "@actions/store/deleteStorePostAction";
import {StatusCodes} from "@node_modules/http-status-codes";
import {deleteFile} from "@components/constants/firebaseHelper";
import {CreateVoteRequest} from "@models/requests/CreateVoteRequest";
import createVoteAction from "@actions/vote/createVoteAction";
import {useRouter} from "next/navigation";


export default function StorePostHeader({post}) {
  const router = useRouter()
  async function handleDeletePost() {
    const res = await deleteStorePostAction(post.id)
    if (res.status === StatusCodes.OK) {
      for (const url of post.images) {
        await deleteFile(url)
      }
    }
    else {
      console.log(res.status)
    }
    router.replace(getHomePath(PostType.STORE))
  }

  async function handleCreateVote(voteType: VoteType) {
    const req: CreateVoteRequest = {
      postType: PostType.STORE,
      postId: post.id,
      voteType: voteType,
    }
    await createVoteAction(req)
  }


  const postHeaderData: IPostHeader = {
    post,
    deletePostHandler: handleDeletePost,
    createVoteHandler: handleCreateVote,
    editHref: getEditFormPath(post.id, PostType.STORE),
  }

  return (
    <PostHeader postHeaderData={postHeaderData}/>
  )
}
