"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import {Button} from "@components/ui/button";
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import NavDrawer from "@components/nav/NavDrawer";


export default function Nav() {
  const { data: session } = useSession()
  const [providers, setProviders] = useState(null)

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response)
    }
    setupProviders().then()
  }, [])


  return (
    <nav className="w-full mb-16 pt-3">
      {/* Desktop Navigation */}
      <div className="hidden sm:flex justify-between">
        <div className="flex gap-20 flex-center">
          <div>
            <Link href="/" className="flex gap-2 flex-center">
              <Image src="/assets/images/eazyaLogo.png" alt="EazyA logo" width={30} height={30} className="object-contain" />
              <p className="logo_text">EazyA</p>
            </Link>
          </div>

          <div className="flex gap-5">
            <Link href="/" className="flex">
              <p className="font-satoshi font-semibold text-lg text-black">Events</p>
            </Link>
            <Link href="/" className="flex">
              <p className="font-satoshi font-semibold text-lg text-black">Community</p>
            </Link>
            <Link href="/" className="flex">
              <p className="font-satoshi font-semibold text-lg text-black">Buy & Sell</p>
            </Link>
          </div>
        </div>

        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Button variant="outline" onClick={signOut}>Sign Out</Button>
              <Link href="/profile">
                <Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="profile" />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <Button key={provider.name} onClick={() => signIn(provider.id)}>
                    Sign In
                  </Button>
                ))
              }
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex sm:hidden flex-between">
        <div className="flex gap-20">
          <div>
            <Link href="/" className="flex gap-2 flex-center">
              <Image src="/assets/images/eazyaLogo.png" alt="EazyA logo" width={30} height={30} className="object-contain" />
              <p className="logo_text">EazyA</p>
            </Link>
          </div>
        </div>

        <div className="flex relative">
          <NavDrawer providers={providers}/>
        </div>
      </div>
    </nav>
  )
}
