"use client"

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import {useSession, signOut} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import {HamburgerMenuIcon} from "@node_modules/@radix-ui/react-icons";
export default function NavDropDown() {
  const {data: session} = useSession()
  const router = useRouter()

  return (
    <div className="flex gap-3 md:gap-5">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <HamburgerMenuIcon width={25} height={25}/>
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
