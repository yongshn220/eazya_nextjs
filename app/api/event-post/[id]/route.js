import { connectToDB } from '@utils/database'
import EventPost from '@models/eventPost'
import { StatusCodes } from 'http-status-codes'

export async function GET(req) {
  try {
    await connectToDB()

    const id = req.params.id
    const eventPost = await EventPost.findById(id)

    console.log(id, eventPost)

    return new Response(JSON.stringify(eventPost), {status: StatusCodes.OK})

  }
  catch (error) {
    return new Response("Failed to fetch all event posts", {status: StatusCodes.INTERNAL_SERVER_ERROR})
  }
}
