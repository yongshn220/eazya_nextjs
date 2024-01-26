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
    <div className="flex-center w-full mt-20">
      <div className="w-full max-w-md">
        <Card className="mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} onChange={e => setError(false)}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">University email</Label>
                  <Input id="email" placeholder="Enter your email (.edu)" required type="email" onChange={(e) => setEmail(e.target.value)}/>
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
    </div>
  )
}

