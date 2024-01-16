import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {UserActivityModel} from "@models/collections/userActivity";
import {StatusCodes} from "http-status-codes";


export async function GET() {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return new Response("Unauthorized", {status: StatusCodes.UNAUTHORIZED})

    let userActivities = await UserActivityModel.find({userId: session.user.id})
    userActivities = userActivities.map(activity => activity.toObject())

    return new Response(JSON.stringify(userActivities), {status: StatusCodes.OK})
  }
  catch (error) {
    return new Response("Internal Error", {status: StatusCodes.INTERNAL_SERVER_ERROR})
  }
}
