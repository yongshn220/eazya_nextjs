"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

export default function Nav() {
  const { data: session } = useSession()
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response)
    }
    setupProviders().then()
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
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

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">Create Post</Link>
            <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
            <Link href="/profile">
              <Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="profile" />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                  Sign In
                </button>
              ))
            }
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="profile" onClick={() => setToggleDropdown((prev) => !prev)}/>
            {toggleDropdown &&
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}> My Profile </Link>
                <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}> Create Prompt </Link>
                <button type="button" className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                >
                  Sign Out
                </button>
              </div>
            }
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                  Sign In
                </button>
              ))
            }
          </>
        )}
      </div>
    </nav>
  )
}
