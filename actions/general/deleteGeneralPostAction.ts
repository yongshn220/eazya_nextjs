import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {GeneralCommunityType} from "@components/constants/enums";
import {GeneralPostModel} from "@models/collections/generalPost";


export default async function deleteGeneralPostAction(postId: string, type: GeneralCommunityType) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const generalPost =  await GeneralPostModel.findById(postId)
    if (!generalPost) return null

    if (session.user.id !== generalPost.authorId.toString()) return null

    await GeneralPostModel.findByIdAndDelete(postId)

    return true
  }
  catch (error) {
    console.log(error)
    return null
  }
  finally {
    revalidatePath(`/general/${type}`)
    redirect(`/general/${type}`)
  }
}
