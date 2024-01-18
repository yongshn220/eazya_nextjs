"use server"

import {CreateStorePostRequest} from "@models/requests/CreateStorePostRequest";
import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";

export default async function createStorePostAction(req: CreateStorePostRequest) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const {images, title, price, description} = req


  }
  catch (error) {

  }
  finally {

  }
}
