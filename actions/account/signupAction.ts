"use server"

import {SignupRequest} from "@models/requests/SignupRequest";
import User from "@models/collections/user";
import {StatusCodes} from "@node_modules/http-status-codes";
import {connectToDB} from "@utils/database";
import bcrypt from "bcryptjs";
import {UniversityCode, MajorType, allowedEmailDomains} from "@components/constants/values";
import { signIn } from "next-auth/react";


export default async function signupAction(req: SignupRequest) {
  try {
    await connectToDB()

    const {email, password} = req

    const [emailName, emailDomain] = email.split('@')
    if (!allowedEmailDomains.includes(emailDomain)) return {status: StatusCodes.UNAUTHORIZED}

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.findOne({email})
    if (user) return {status: StatusCodes.CONFLICT}

    await User.create({
      universityCode: UniversityCode.STONY_BROOK,
      email,
      password: hashedPassword,
      username: emailName[0],
      major: MajorType.NONE,
      createdAt: new Date,
      initialized: false,
    })

    return {status: StatusCodes.OK}
  }
  catch (error) {
    console.log(error)
    return {status: StatusCodes.INTERNAL_SERVER_ERROR}
  }
}
