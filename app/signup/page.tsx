'use client'

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import Link from "@node_modules/next/link";
import {useState} from "react";
import {allowedEmailDomains} from "@components/constants/values";
import {StatusCodes} from "@node_modules/http-status-codes";
import {MailboxIcon} from "@node_modules/lucide-react";
import signupAction from "@actions/account/signupAction";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [serverMessage, setServerMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEmailVerifying, setIsEmailVerifying] = useState(false)


  function signupValidCheck() {
    const emailDomain = email.split('@')[1]

    if (!allowedEmailDomains.includes(emailDomain)) {
      setEmailError(true); return false
    }
    setEmailError(false)

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
    if (!passwordRegex.test(password)) {
      setPasswordError(true); return false
    }
    setPasswordError(false)

    if (password !== confirmPassword) {
      setConfirmPasswordError(true); return false
    }
    setConfirmPasswordError(false)
    return true
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (!signupValidCheck()) return

      const res1 = await signupAction({email, password})
      if (res1.status === StatusCodes.UNAUTHORIZED) {
        return setServerMessage("Your email is unauthorized.")
      }
      if (res1.status === StatusCodes.CONFLICT) {
        return setServerMessage("You already have an account.")
      }
      if (res1.status !== StatusCodes.OK) {
        return setServerMessage("Internal server error.")
      }

      setIsEmailVerifying(true)
    }
    catch (error) {
      return setServerMessage("Internal server error.")
    }
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-center flex-col w-full mt-16">
      <div className="w-full flex-center flex-col">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 blue_gradient">Welcome to EazyA!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">A completely anonymous university community</p>
      </div>
      {
        !isEmailVerifying &&
        <div className="w-full max-w-md">
          <Card className="mx-auto">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">University email</Label>
                    <Input id="email" disabled={isSubmitting} placeholder="Enter your email (.edu)" required
                           type="email" onChange={e => setEmail(e.target.value)}/>
                    {
                      emailError &&
                      <p className="text-red-500 text-sm">Email should be a university email ends with .edu</p>
                    }
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Password</Label>
                    <Input id="newPassword" disabled={isSubmitting} required type="password"
                           onChange={e => setPassword(e.target.value)}/>
                    {
                      passwordError &&
                      <p className="text-red-500 text-sm">Your password must be have at least:
                        <br/> - 8 characters long <br/> - 1 uppercase & 1 lowercase <br/> - 1 number</p>
                    }
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" disabled={isSubmitting} required type="password"
                           onChange={e => setConfirmPassword(e.target.value)}/>
                    {
                      confirmPasswordError &&
                      <p className="text-red-500 text-sm">Password is not match</p>
                    }
                  </div>
                  <p className="text-red-500 text-sm">{serverMessage}</p>
                  {
                    isSubmitting ?
                      <Button className="w-full" disabled={true}>
                        Creating Account...
                      </Button>
                      :
                      <Button className="w-full" type="submit">
                        Create Account
                      </Button>
                  }
                </div>
              </form>
              <div className="flex-center mt-4 text-center text-sm gap-2">
                <p>Already have an account?</p>
                <Link className="underline" href="/signin">
                  Sign In
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      }
      {
        isEmailVerifying &&
        <div className="max-w-md">
          <Card className="mx-auto">
            <CardContent>
              <div className="flex justify-center items-center mt-6">
                <MailboxIcon className="h-12 w-12 text-gray-700 dark:text-gray-300"/>
              </div>
              <h1 className="text-3xl font-bold text-center mt-4 text-gray-700 dark:text-gray-200">Email
                Verification</h1>
              <p className="text-gray-600 dark:text-gray-400 text-center mt-2 px-6">
                We have sent a verification link to your email. Please check your inbox and click the link to verify
                your
                email address.
              </p>
              <div className="flex justify-center mt-6">
                <Button className="w-full">
                  Resend Email
                </Button>
              </div>
              <div className="flex-center mt-4 text-center text-sm gap-2">
                <p>Successfully verified your email?</p>
                <Link className="underline" href="/signin">
                  Sign In
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      }
    </div>
  )
}

