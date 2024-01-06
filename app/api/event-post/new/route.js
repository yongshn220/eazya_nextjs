import { getServerSession } from "next-auth/next"
import { connectToDB } from '@utils/database'
import EventPost from "@models/eventPost";
import {StatusCodes} from "http-status-codes";
import {authOptions} from "@app/api/auth/[...nextauth]/route";


export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (!session) return new Response("Fail to create a post", {status: StatusCodes.UNAUTHORIZED})

  const {image, title, date, time, location, description } = await req.json()

  try {
    await connectToDB()
    const newEventPost = new EventPost({
      authorId: session.user.id,
      universityId: session.user.universityId,
      image,
      title,
      date,
      time,
      location,
      description,
      createdAt: new Date().toISOString(),
      outOfService: false,
      voteUsers: {upvoted: [], downvoted: []},
      comments: [],
    })
    newEventPost.save()
    return new Response(JSON.stringify(newEventPost), {status: StatusCodes.OK})
  }
  catch (error) {
    return new Response({status: StatusCodes.INTERNAL_SERVER_ERROR})
  }
}
