"use server"

import {CreateGeneralPostRequest} from "@models/requests/CreateGeneralPostRequest";
import {connectToDB} from "@utils/database";
import {getServerSession} from "next-auth/next";
import {redirect} from "next/navigation";
import {authOptions} from "@app/api/auth/[...nextauth]/option";
import {UserActivityType} from "@components/constants/enums";
import {CreateUserActivityRequest} from "@models/requests/CreateUserActivityRequest";
import createUserActivityAction from "@actions/userActivity/createUserActivityAction";
import {revalidateTag} from "next/cache";
import {getCommunityPostModelByType} from "@actions/actionHelper/helperFunctions";
import {getCommunityHomePath, getCommunityPostIdsGroupTag, getHomePath} from "@components/constants/tags";

export default async function createCommunityPostAction(req: CreateGeneralPostRequest) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) {
  console.log("Get session fail")
  return null
}

    const {postType, communityType, title, description} = req

    const CommunityPostModel = getCommunityPostModelByType(postType)

    const newCommunityPost = new CommunityPostModel({
      universityCode: session.user.universityCode,
      authorId: session.user.id,
      authorMajor: session.user.major,
      type: postType,
      communityType,
      title,
      description,
      createdAt: new Date(),
      outOfService: false,
      voteUser: {upvoted: [], downvoted: []},
      commentators: [],
      comments: [],
    })
    await newCommunityPost.save()

    const activityReq: CreateUserActivityRequest = {
      userActivityType: UserActivityType.CREATE_POST,
      postType: postType,
      communityType: communityType,
      postId: newCommunityPost._id,
      preview: newCommunityPost.title,
    }
    await createUserActivityAction(activityReq)

    return newCommunityPost
  }
  catch (error) {
    console.log(error)
    return null
  }
  finally {
    revalidateTag(getCommunityPostIdsGroupTag(req.postType, req.communityType))
    redirect(getCommunityHomePath(req.postType, req.communityType))
  }
}
