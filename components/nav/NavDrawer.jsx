"use client"

import {Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,} from "@/components/ui/drawer"
import {Button} from "@components/ui/button";
import {HamburgerMenuIcon} from "@node_modules/@radix-ui/react-icons";
import Link from "next/link";
import { signIn, signOut, useSession } from 'next-auth/react'
import {useState} from "react";
import Image from "next/image";
import {getCommunityHomePath, getHomePath} from "@components/constants/tags";
import {CommunityType, PostType, UtilPath} from "@components/constants/enums";

export default function NavDrawer({providers}) {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  function handleSignOut() {
    setIsOpen(false)
    signOut()
  }

  return (
    <Drawer>
      <DrawerTrigger>
        <HamburgerMenuIcon width={25} height={25} onClick={() => setIsOpen((prev) => !prev)}/>
      </DrawerTrigger>
      <div className="w-full mx-auto max-w-sm">

        <DrawerContent>
          <DrawerHeader className="flex-center">
            <Image src="/assets/images/eazyaLogo.png" alt="EazyA logo" width={30} height={30} className="object-contain" />
            <DrawerTitle>EazyA</DrawerTitle>
          </DrawerHeader>

          <div className="w-full flex-center flex-col gap-4 pb-4">
            <DrawerClose asChild>
              <Link href={getHomePath(PostType.EVENT)} className="dropdown_link" onClick={() => setIsOpen(false)}>
                <p className="text-lg">Events</p>
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link href={getCommunityHomePath(PostType.GENERAL, CommunityType.EVERYONE)} className="dropdown_link" onClick={() => setIsOpen(false)}>
                <p className="text-lg">General</p>
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link href={getCommunityHomePath(PostType.FIND_MEMBER, CommunityType.EVERYONE)} className="dropdown_link" onClick={() => setIsOpen(false)}>
                <p className="text-lg">Find Member</p>
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link href={getHomePath(PostType.STORE)} className="dropdown_link" onClick={() => setIsOpen(false)}>
                <p className="text-lg">Buy & Sell</p>
              </Link>
            </DrawerClose>
          </div>

          <DrawerFooter className="border-t">
            <div className="flex-center flex-col gap-4">
              {
                session?.user ?
                <>
                  <DrawerClose asChild>
                    <Link href="/my-activity" className="dropdown_link" onClick={() => setIsOpen(false)}>
                      <p className="text-lg">My Activity</p>
                    </Link>
                  </DrawerClose>
                  <DrawerClose asChild className="w-full">
                    <Link href="/">
                      <Button onClick={handleSignOut} className="w-full">Sign Out</Button>
                    </Link>
                  </DrawerClose>
                </>
                  :
                <>
                  {providers &&
                    Object.values(providers).map((provider) => (
                      <Link key={provider.name} href={UtilPath.SIGNIN}>
                        <Button>Sign In</Button>
                      </Link>
                    ))
                  }
                </>
              }
            </div>
          </DrawerFooter>
        </DrawerContent>
      </div>
    </Drawer>
  )
}


