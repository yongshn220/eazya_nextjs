import {GeneralCommunityType} from "@components/constants/enums";
import {connectToDB} from "@utils/database";
import {GeneralPostModel} from "@models/collections/generalPost";
import {toJson} from "@actions/actionHelper/utilFunction";


export default async function getGeneralIdsAction(communityType: GeneralCommunityType) {
  try {
    await connectToDB()
    const generalPosts = await GeneralPostModel.find({communityType: communityType})
    const ids = generalPosts.map(post => post._id)

    return toJson(ids)
  }
  catch (error) {
    console.log(error)
    return null
  }
  finally {

  }
}
