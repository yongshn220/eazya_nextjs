import {Button} from "@components/ui/button";
import Link from 'next/link'
import {getServerSession} from "next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/option";

export default async function HomeHeader({ title, subtitle, buttonName, createRoute }) {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex justify-between sm:flex-col pb-5 border-b">
      <p className="head2_text blue_gradient">
        SBU {title}
      </p>
      <div className="flex justify-between items-center">
        <p className="hidden sm:flex desc mb-4 sm:mb-0">
          {subtitle}
        </p>
        {
          session ?
          <Link href={`/${createRoute}`}>
            <Button className="self-end sm:self-auto">Add {buttonName}</Button>
          </Link>
          :
          <Button disabled={!session} variant="outline" className="self-end sm:self-auto">Add {buttonName}</Button>
        }
      </div>
    </div>
  )
}
