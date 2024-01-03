"use client"

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import {useSession, signOut} from 'next-auth/react'
import {useRouter} from 'next/navigation'
export default function NavDropDown() {
  const {data: session} = useSession()
  const router = useRouter()

  return (
    <div className="flex gap-3 md:gap-5">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="profile" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => router.push('/my-activity')}>My Activity</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/account')}>Account</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
