import {EventFormRequest} from "@models/requests/EventFormRequest";
import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {EventPostModel} from "@models/collections/eventPost";
import {addFileToStorage, getStorageFileFromStringUrl} from "@actions/actionHelper/googleStorageHelperFunctions";
import {PostType} from "@components/constants/enums";



export default async function editEventPostAction(postId: string,  req: EventFormRequest) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const post = await EventPostModel.findById(postId)
    if (!post) return null

    let {image, title, date, time, location, description } = req

    if (post.image !== image) {
      const newPublicUrl = await addFileToStorage(PostType.EVENT, session, image)
      if (!newPublicUrl) return null

      const oldFile = getStorageFileFromStringUrl(post.image)
      await oldFile.delete()
    }
    


  }
  catch (error) {

  }
  finally {

  }
}
