import NextAuth, { DefaultSession, Profile } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      address: string
      id: string
      universityId: string
    } & DefaultSession["user"]
  }

  interface Profile {
    picture: string
  }
}
