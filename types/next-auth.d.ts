import NextAuth, { DefaultSession, Profile } from "next-auth"
import {MajorType} from "@components/constants/values";

declare module "next-auth" {
  interface Session {
    user: {
      address: string
      id: string
      universityId: string
      major: MajorType
      initialized: boolean
    } & DefaultSession["user"]
  }

  interface Profile {
    picture: string
  }
}
