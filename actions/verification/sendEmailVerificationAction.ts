"use server"

import nodemailer from 'nodemailer'
import {SendEmailVerificationRequest} from "@models/requests/SendEmailVerificationRequest";
import bcrypt from "bcryptjs";
import User from "@models/collections/user";
import {EmailType} from "@components/constants/enums";
import {connectToDB} from "@utils/database";

export default async function sendEmailVerificationAction(req: SendEmailVerificationRequest) {
  try {
    await connectToDB()

    const {email, emailType, userId} = req
    const hashedToken = await bcrypt.hash(userId.toString(), 10)

    if (emailType === EmailType.VERIFY) {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + (60 * 60 * 1000),
      })
    }
    else if (emailType === EmailType.RESET) {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + (60 * 60 * 1000),
      })
    }
    else return null

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW,
      }
    })

    await new Promise((resolve, reject) => {
      // verify connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
          reject(error);
        }
        else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });


    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: (emailType == EmailType.VERIFY)? "Verify your email" : "Reset your password",
      html:
        `<p>
          Click <a href="${process.env.NEXT_BASE_URL}/verify-email?token=${hashedToken}">here</a> ${(emailType === EmailType.VERIFY)? " to verify your email" : " to reset your password"}
    
        </p>`
    }

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        else {
          console.log(info);
          resolve(info);
        }
      });
    });
    return true
  }
  catch (error) {
    console.log(error)
    return false
  }
}
