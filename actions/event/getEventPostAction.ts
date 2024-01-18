import {connectToDB} from "@utils/database";
import {EventPostModel, IEventPost} from "@models/collections/eventPost";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {VoteType} from "@components/constants/enums";
import {VoteUser} from "@models/base/voteUserBase";
import {ReplyBase} from "@models/base/replyBase";
import {CommentBase} from "@models/base/commentBase";
import {getUserVoteType, makePostAnonymous, setDynamicDataToPost} from "@actions/actionHelper/helperFunctions";
import {toJson} from "@actions/actionHelper/utilFunction";
import {IPost} from "@models/union/union";


export default async function getEventPostAction(postId: string) {
  try {
    await connectToDB()
    const eventPost = await EventPostModel.findById(postId)
    if (!eventPost) return null

    const session = await getServerSession(authOptions)
    let post = eventPost.toObject() as IPost
    post = toJson(post)
    post = setDynamicDataToPost(session, post)

    return toJson(post)
  }
  catch (error) {
    console.log(error)
    return null
  }
}
