import {NextAuthOptions} from "@node_modules/next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/collections/user";
import {connectToDB} from "@utils/database";
import bcrypt from "bcryptjs";
import {MajorType} from "@components/constants/values";


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials: any) {
        const { email, password } = credentials;

        try {
          await connectToDB()
          const user = await User.findOne({email: email})
          if (!user) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)
          if (!passwordsMatch) return null

          if (!user.isVerified) return null

          return user.toObject()
        }
        catch (error) {
          console.log(error)
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({session}) {
      if (!session) return null

      await connectToDB()
      const sessionUser = await User.findOne({email: session.user.email})
      if (!sessionUser) return null

      session.user.id = sessionUser._id.toString()
      session.user.universityCode = sessionUser.universityCode.toString()
      session.user.major = sessionUser.major as MajorType
      session.user.initialized = sessionUser.initialized
      session.user.isVerified = sessionUser.isVerified
      return session
    },
  }
}
