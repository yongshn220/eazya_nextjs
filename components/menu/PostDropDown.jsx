"use client"

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import {HamburgerMenuIcon} from "@node_modules/@radix-ui/react-icons";
import {dangerTextColor} from "@components/constants/values";
import {DeletePostAlertDialog} from "@components/util/DeletePostAlertDialog";
import {useState} from "react";
export default function PostDropDown({post}) {
  const {data: session} = useSession()
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  function toggleDeleteDialogOpen() {
    setIsDeleteDialogOpen(prev => !prev)
  }

  return (
    <div className="flex gap-3 md:gap-5">
      <DeletePostAlertDialog open={isDeleteDialogOpen} onOpenChange={toggleDeleteDialogOpen} onContinue={() => {}}/>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <HamburgerMenuIcon width={25} height={25} className="my-1"/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {
            (!session || session.user.id !== post.authorId) ?
            <>
              <DropdownMenuItem >Share</DropdownMenuItem>
              <DropdownMenuItem >Report</DropdownMenuItem>
            </>
            :
            <>
              <DropdownMenuItem >Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={toggleDeleteDialogOpen} className={dangerTextColor}>Delete</DropdownMenuItem>
            </>
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
