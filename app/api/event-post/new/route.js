import { connectToDB } from '@utils/database'
import EventPost from "@models/eventPost";
import {StatusCodes} from "http-status-codes";

export async function POST(req) {
  const { authorId, universityId, image, title, date, time, location, description } = await req.json()

  try {
    await connectToDB()
    const newEventPost = new EventPost({
      authorId,
      universityId,
      image,
      title,
      date,
      time,
      location,
      description,
      createAt: new Date().toISOString(),
      outOfService: false,
      voteUsers: {upvoted: [], downvoted: []},
      comments: [],
    })
    newEventPost.save()
    return new Response(JSON.stringify(newEventPost), {status: StatusCodes.OK})
  }
  catch (error) {
    return new Response()
  }
}
