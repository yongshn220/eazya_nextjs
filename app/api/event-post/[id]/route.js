import { connectToDB } from '@utils/database'
import EventPost from '@models/eventPost'
import { StatusCodes } from 'http-status-codes'

export async function GET(req, { params }) {
  try {
    await connectToDB()

    const eventPost = await EventPost.findById(params.id)

    return new Response(JSON.stringify(eventPost), {status: StatusCodes.OK})

  }
  catch (error) {
    return new Response("Failed to fetch all event posts", {status: StatusCodes.INTERNAL_SERVER_ERROR})
  }
}
