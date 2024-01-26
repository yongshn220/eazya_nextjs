"use server"

import User from "@models/collections/user";
import {StatusCodes} from "@node_modules/http-status-codes";
import {connectToDB} from "@utils/database";


export default async function verifyEmailVerification(token: string) {
  try {
    await connectToDB()

    const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})
    if (!user) return {status: StatusCodes.NOT_FOUND}

    user.isVerified = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined
    await user.save()

    return {status: StatusCodes.OK}
  }
  catch (error) {
    console.log(error)
    return {status: StatusCodes.INTERNAL_SERVER_ERROR}
  }
}
