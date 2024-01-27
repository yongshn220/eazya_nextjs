'use client'

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from 'next/navigation'

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [onSubmitting, setOnSubmitting] = useState(false)
  const [error, setError] = useState(false)

  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault();
    setOnSubmitting(true)
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.ok) {
        router.replace('/')
      }
      if (res.error) {
        setError(true)
      }
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setOnSubmitting(false)
    }
  }

  return (
    <div className="flex-center flex-col w-full mt-16">
      <div className="w-full max-w-md mb-[50px]">
        <div className="w-full flex-center flex-col">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 blue_gradient">Welcome to EazyA!</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">A completely anonymous university community</p>
        </div>
        <Card className="mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} onChange={e => setError(false)}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">University email</Label>
                  <Input id="email" placeholder="Enter your email (.edu)" required type="email"
                         onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" required type="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {
                  error &&
                  <p className="text-red-500 text-sm">Wrong email or password.</p>
                }
                {
                  onSubmitting ?
                    <Button className="w-full" disabled={true}>
                      Signing In...
                    </Button>
                    :
                    <Button className="w-full" type="submit">
                      Sign In
                    </Button>
                }
              </div>
            </form>
            <div className="flex flex-col mt-4 text-center text-sm gap-2">
              <Link className="underline" href="#">
                Forgot your password?
              </Link>
              <Link className="underline" href="/signup">
                Create account
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      {/*<section className="w-full p-10">*/}
      {/*  <div className="container px-4 md:px-6">*/}
      {/*    <div className="flex flex-col items-center justify-center space-y-4 text-center">*/}
      {/*      <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Faster iteration. More innovation.</h2>*/}
      {/*      <p className="max-w-[900px] text-gray-500 md:text-xl dark:text-gray-400">*/}
      {/*        The platform for rapid progress. Let your team focus on shipping features instead of managing*/}
      {/*        infrastructure with automated CI/CD, built-in testing, and integrated collaboration.*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
    </div>
  )
}

