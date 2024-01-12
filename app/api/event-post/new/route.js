import { getServerSession } from "next-auth/next"
import { Storage } from '@google-cloud/storage';
import { connectToDB } from '@utils/database'
import {EventPostModel} from "@models/collections/eventPost";
import {StatusCodes} from "http-status-codes";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import { v4 as uuidv4 } from 'uuid';



export async function POST(req) {
  // const session = await getServerSession(authOptions)
  // if (!session) return new Response("Fail to create a post", {status: StatusCodes.UNAUTHORIZED})
  //
  // const {image, type, title, date, time, location, description } = await req.json()
  //
  // const credentials = JSON.parse(Buffer.from(process.env.GOOGLE_CLOUD_STORAGE_CREDENTIALS_BASE64, 'base64').toString('ascii'))
  // const storage = new Storage({ credentials })
  //
  // const base64Data = image.split(';base64,').pop();
  // const buffer = Buffer.from(base64Data, 'base64');
  //
  // const imageName = `event/${session.user.email}/${Date.now()}-${uuidv4()}`
  // const bucketName = 'eazya_bucket_sbu'
  // const file = storage.bucket(bucketName).file(imageName)
  // await file.save(buffer)
  //
  // const publicUrl = `https://storage.googleapis.com/${bucketName}/${imageName}`;
  //
  // try {
  //   await connectToDB()
  //   const newEventPost = new EventPostModel({
  //     authorId: session.user.id,
  //     universityId: session.user.universityId,
  //     type,
  //     image: publicUrl,
  //     title,
  //     date,
  //     time,
  //     location,
  //     description,
  //     createdAt: new Date().toISOString(),
  //     outOfService: false,
  //     voteUser: {upvoted: [], downvoted: []},
  //     comments: [],
  //   })
  //   newEventPost.save()
  //
  //   return new Response(JSON.stringify(newEventPost), {status: StatusCodes.OK})
  // }
  // catch (error) {
  //   return new Response("Fail to create a post", {status: StatusCodes.INTERNAL_SERVER_ERROR})
  // }
}
