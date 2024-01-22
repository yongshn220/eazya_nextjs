import NextAuth from 'next-auth'
import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@utils/database";
import User from '@models/collections/user'
import {MajorType, UniversityIds} from "@components/constants/values";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({session}) {
      const sessionUser = await User.findOne({
        email: session.user.email
      })
      session.user.id = sessionUser._id.toString()
      session.user.universityId = sessionUser.universityId.toString()
      session.user.major = sessionUser.major as MajorType
      session.user.initialized = sessionUser.initialized
      return session
    },
    async signIn({profile}) {
      try {
        const emailDomain = profile.email.split('@')[1]
        const universityId = emailDomain.split('.')[0]
        if (!UniversityIds.includes(universityId)) return false

        await connectToDB()
        const userExists = await User.findOne({
          email: profile.email
        })

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            universityId: universityId,
            major: MajorType.NONE,
            createdAt: new Date(),
          })
        }
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    }
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

