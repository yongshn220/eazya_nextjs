import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {StatusCodes} from "@node_modules/http-status-codes";
import {Storage} from "@node_modules/@google-cloud/storage";
import { v4 as uuidv4 } from 'uuid';
import {connectToDB} from "@utils/database";
import {EventPostModel} from "@models/collections/eventPost";
import {CreateEventPostRequest} from "@models/requests/CreateEventPostRequest";

export async function createEventPostAction(req: CreateEventPostRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return {status: StatusCodes.UNAUTHORIZED}

  const {image, type, title, date, time, location, description } = req

  const credentials = JSON.parse(Buffer.from(process.env.GOOGLE_CLOUD_STORAGE_CREDENTIALS_BASE64, 'base64').toString('ascii'))
  const storage = new Storage({ credentials })

  const arrayBuffer = await image.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const imageName = `event/${session.user.email}/${Date.now()}-${uuidv4()}`
  const bucketName = 'eazya_bucket_sbu'
  const file = storage.bucket(bucketName).file(imageName)
  await file.save(buffer)

  const publicUrl = `https://storage.googleapis.com/${bucketName}/${imageName}`;

  try {
    await connectToDB()
    const newEventPost = new EventPostModel({
      authorId: session.user.id,
      universityId: session.user.universityId,
      type,
      image: publicUrl,
      title,
      date,
      time,
      location,
      description,
      createdAt: new Date().toISOString(),
      outOfService: false,
      voteUser: {upvoted: [], downvoted: []},
      comments: [],
    })
    newEventPost.save()

    return newEventPost
  }
  catch (error) {
    return {status: StatusCodes.INTERNAL_SERVER_ERROR}
  }
}
