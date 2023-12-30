"use client"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {Button} from "@components/ui/button";
import {HamburgerMenuIcon} from "@node_modules/@radix-ui/react-icons";
import Link from "next/link";
import { signIn, signOut, useSession } from 'next-auth/react'
import {useState} from "react";
import Image from "@node_modules/next/image";

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
              <Link href="/events" className="dropdown_link" onClick={() => setIsOpen(false)}>
                <p className="text-lg">Events</p>
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link href="/general" className="dropdown_link" onClick={() => setIsOpen(false)}>
                <p className="text-lg">General</p>
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link href="/find-member" className="dropdown_link" onClick={() => setIsOpen(false)}>
                <p className="text-lg">Find Member</p>
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link href="/buy-sell" className="dropdown_link" onClick={() => setIsOpen(false)}>
                <p className="text-lg">Buy & Sell</p>
              </Link>
            </DrawerClose>
          </div>

          <DrawerFooter className="border-t">
            <div className="flex-center flex-col gap-4">
              {
                session?.user ?
                <>
                  <Link href="/profile" className="dropdown_link" onClick={() => setIsOpen(false)}>
                    <p className="text-lg">My Profile</p>
                  </Link>
                  <Button onClick={handleSignOut} className="w-full">Sign Out</Button>
                </>
                  :
                <>
                  {providers &&
                    Object.values(providers).map((provider) => (
                      <Button key={provider.name} onClick={() => signIn(provider.id)} className="w-full">
                        Sign In
                      </Button>
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


