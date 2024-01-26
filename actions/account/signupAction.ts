"use server"

import {SignupRequest} from "@models/requests/SignupRequest";
import User from "@models/collections/user";
import {StatusCodes} from "@node_modules/http-status-codes";
import {connectToDB} from "@utils/database";
import bcrypt from "bcryptjs";
import {allowedEmailDomains, MajorType, UniversityCode} from "@components/constants/values";
import {SendEmailVerificationRequest} from "@models/requests/SendEmailVerificationRequest";
import {EmailType} from "@components/constants/enums";
import sendEmailVerificationAction from "@actions/verification/sendEmailVerificationAction";


export default async function signupAction(req: SignupRequest) {
  try {
    await connectToDB()

    const {email, password} = req

    const [emailName, emailDomain] = email.split('@')
    if (!allowedEmailDomains.includes(emailDomain)) return {status: StatusCodes.UNAUTHORIZED}

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.findOne({email})
    if (user && user.isVerified) return {status: StatusCodes.CONFLICT}

    const data = {
        initialized: false,
        universityCode: UniversityCode.STONY_BROOK,
        email,
        password: hashedPassword,
        username: emailName[0],
        major: MajorType.NONE,
        createdAt: new Date(),
    }
    const newUser = (user)
      ? await User.findOneAndUpdate({email}, data)
      : await User.create(data)

    const sendEmailReq: SendEmailVerificationRequest = {
      email,
      emailType: EmailType.VERIFY,
      userId: newUser._id,
    }
    const res = await sendEmailVerificationAction(sendEmailReq)
    if (!res) return {status: StatusCodes.REQUEST_TIMEOUT}

    return {status: StatusCodes.OK}
  }
  catch (error) {
    console.log(error)
    return {status: StatusCodes.INTERNAL_SERVER_ERROR}
  }
}
