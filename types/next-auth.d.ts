import NextAuth, { DefaultSession, Profile } from "next-auth"
import {MajorType} from "@components/constants/values";

declare module "next-auth" {
  interface Session {
    user: {
      address: string
      id: string
      universityCode: string
      major: MajorType
      initialized: boolean
      isVerified: boolean
    } & DefaultSession["user"]
  }

  interface Profile {
    picture: string
  }
}
