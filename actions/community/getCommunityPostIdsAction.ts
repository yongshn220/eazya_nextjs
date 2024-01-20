import {CommunityType, PostType} from "@components/constants/enums";
import {connectToDB} from "@utils/database";
import {GeneralPostModel} from "@models/collections/generalPost";
import {toJson} from "@actions/actionHelper/utilFunction";
import {getCommunityPostModelByType} from "@actions/actionHelper/helperFunctions";


export default async function getCommunityPostIdsAction(postType: PostType, communityType: CommunityType) {
  try {
    await connectToDB()

    const CommunityPostModel = getCommunityPostModelByType(postType)
    if (!CommunityPostModel) return null

    const posts = await CommunityPostModel.find({communityType: communityType})
    const ids = posts.map(post => post._id)

    return toJson(ids)
  }
  catch (error) {
    console.log(error)
    return null
  }
}
