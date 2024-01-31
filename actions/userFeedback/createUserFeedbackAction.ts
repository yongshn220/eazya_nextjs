'use server'

import {StatusCodes} from "@node_modules/http-status-codes";
import {connectToDB} from "@utils/database";
import {UserFeedbackModel} from "@models/collections/userFeedback";


export default async function createUserFeedbackAction(content: string) {
  try {
    await connectToDB()
    const res = await UserFeedbackModel.create({
      content,
      createdAt: new Date(),
    })
    if (!res) return {status: StatusCodes.NOT_FOUND}

    return {status: StatusCodes.OK}
  }
  catch (error) {
    console.log(error)
    return {status: StatusCodes.INTERNAL_SERVER_ERROR}
  }
}
