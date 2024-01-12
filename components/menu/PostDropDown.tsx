"use client"

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {useSession} from 'next-auth/react'
import {HamburgerMenuIcon} from "@node_modules/@radix-ui/react-icons";
import {dangerTextColor} from "@components/constants/values";
import {DeletePostAlertDialog} from "@components/util/DeletePostAlertDialog";
import {useState} from "react";
import {IDropDown} from "@components/headers/PostHeader";

interface Props {
  dropDownData: IDropDown
}

export default function PostDropDown({dropDownData}: Props) {
  const {data: session} = useSession()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const {authorId, postDeleteHandler, editHref} = dropDownData

  function toggleDeleteDialogOpen() {
    setIsDeleteDialogOpen(prev => !prev)
  }

  return (
    <div className="flex gap-3 md:gap-5">
      <DeletePostAlertDialog open={isDeleteDialogOpen} onOpenChange={toggleDeleteDialogOpen} onContinue={postDeleteHandler}/>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <HamburgerMenuIcon width={25} height={25} className="my-1"/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {
            (!session || session.user.id !== authorId) ?
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
