import {connectToDB} from "@utils/database";
import {StorePostModel} from "@models/collections/storePost";
import {toJson} from "@actions/actionHelper/utilFunction";


export default async function getStorePostIdsAction() {
  try {
    await connectToDB()
    const storePosts = await StorePostModel.find()
    const ids = storePosts.map(post => post._id)

    return toJson(ids)
  }
  catch (error) {
    console.log(error)
    return null
  }
}
