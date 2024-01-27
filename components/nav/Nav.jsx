"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, useSession, getProviders } from 'next-auth/react'
import {Button} from "@components/ui/button";
import NavDrawer from "@components/nav/NavDrawer";
import NavDropDown from "@components/nav/NavDropDown";
import NavNotificationDropDown from "@components/nav/NavNotificationDropDown";
import {useRecoilValue} from "@node_modules/recoil";
import {selectedNavTabAtom} from "@components/constants/globalStates";
import {NavTab, UtilPath} from "@components/constants/enums";

export default function Nav() {
  const { data: session } = useSession()
  const [providers, setProviders] = useState(null)
  const selectedNavTab = useRecoilValue(selectedNavTabAtom)

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response)
    }
    setupProviders().then()
  }, [])


  return (
    <nav className="w-full mb-8 pt-3">
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-between">
        <div className="flex gap-20 flex-center">
          <div>
            <Link href="/" className="flex gap-2 flex-center">
              <Image src="/assets/images/eazyaLogo.png" alt="EazyA logo" width={30} height={30} className="object-contain" />
              <p className="logo_text">EazyA</p>
            </Link>
          </div>

          <div className="flex gap-10">
            <Link href="/events" className="flex">
              <p className={`font-satoshi text-sm hover_text_blue ${selectedNavTab === NavTab.EVENT? "text-blue-600" : "text-black"}`}>EVENTS</p>
            </Link>
            <Link href="/general/Everyone" className="flex">
              <p className={`font-satoshi text-sm hover_text_blue ${selectedNavTab === NavTab.GENERAL? "text-blue-600" : "text-black"}`}>GENERAL</p>
            </Link>
            <Link href="/find-member/Everyone" className="flex">
              <p className={`font-satoshi text-sm hover_text_blue ${selectedNavTab === NavTab.FIND_MEMBER? "text-blue-600" : "text-black"}`}>FIND MEMBER</p>
            </Link>
            <Link href="/store" className="flex">
              <p className={`font-satoshi text-sm hover_text_blue ${selectedNavTab === NavTab.STORE? "text-blue-600" : "text-black"}`}>BUY & SELL</p>
            </Link>
          </div>
        </div>

        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="h-full flex-center gap-10">
              <NavNotificationDropDown/>
              <NavDropDown/>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <Link key={provider.name} href={UtilPath.SIGNIN}>
                    <Button>Sign In</Button>
                  </Link>
                ))
              }
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex-between md:hidden">
        <div className="flex gap-20">
          <div>
            <Link href="/" className="flex gap-2 flex-center">
              <Image src="/assets/images/eazyaLogo.png" alt="EazyA logo" width={30} height={30} className="object-contain" />
              <p className="logo_text">EazyA</p>
            </Link>
          </div>
        </div>

        <div className="relative flex gap-4">
          {
            session &&
            <div className="flex-center">
              <NavNotificationDropDown/>
            </div>
          }
          <div className="flex-center">
            <NavDrawer providers={providers}/>
          </div>
        </div>
      </div>
    </nav>
  )
}
