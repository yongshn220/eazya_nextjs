"use server"

import {EditProfileRequest} from "@models/requests/EditProfileRequest";
import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import User from "@models/collections/user";


export default async function editProfileAction(req: EditProfileRequest) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions)
    if (!session) return null

    const res = await User.findOneAndUpdate({_id: session.user.id}, {
      initialized: true,
      major: req.major
    })
    if (!res) return null

    return true
  }
  catch (error) {
    console.log(error)
    return null
  }
  finally {

  }
}
