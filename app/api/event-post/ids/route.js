import { connectToDB } from '@utils/database'
import EventPost from '@models/eventPost'
import { StatusCodes } from 'http-status-codes'

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 10;

export async function GET(req) {
  try {
    await connectToDB()

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page')) || DEFAULT_PAGE_NUMBER
    const limit = parseInt(searchParams.get('limit')) || DEFAULT_PAGE_LIMIT

    const skip = (page - 1) * limit

    const eventPosts = await EventPost.find({}).skip(skip).limit(limit)
    const ids = eventPosts.map(post => post._id)

    return new Response(JSON.stringify(ids), {status: StatusCodes.OK})

  }
  catch (error) {
    return new Response("Failed to fetch all event posts", {status: StatusCodes.INTERNAL_SERVER_ERROR})
  }
}
