"use server"

import {CommunityFormRequest} from "@models/requests/CommunityFormRequest";
import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/option";
import {getCommunityPostModelByType} from "@actions/actionHelper/helperFunctions";
import {revalidateTag} from "next/cache";
import {getCommunityPostPath, getPostTag} from "@components/constants/tags";
import {redirect} from "next/navigation";


export default async function editCommunityPostAction(postId: string, req: CommunityFormRequest) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const {postType, communityType, title, description} = req

    const CommunityPostModel = getCommunityPostModelByType(postType)
    if (!CommunityPostModel) return null

    await CommunityPostModel.findOneAndUpdate({_id: postId}, {
      communityType,
      title,
      description,
    })

    return true
  }
  catch (error) {
    console.log(error)
    return null
  }
  finally {
    revalidateTag(getPostTag(postId, req.postType))
    redirect(getCommunityPostPath(postId, req.postType, req.communityType))
  }
}
