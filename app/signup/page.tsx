'use client'

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import Link from "@node_modules/next/link";
import {useState} from "react";
import {allowedEmailDomains} from "@components/constants/values";
import signupAction from "@actions/account/signupAction";
import {StatusCodes} from "@node_modules/http-status-codes";
import {useRouter} from 'next/navigation'
import {signIn} from "@node_modules/next-auth/react";
import {UtilPath} from "@components/constants/enums";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [serverMessage, setServerMessage] = useState("")
  const [onSubmitting, setOnSubmitting] = useState(false)

  const router = useRouter()

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
    setOnSubmitting(true)
    try {
      if (!signupValidCheck()) return

      const [emailSave, passwordSave] = [email, password]

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

      const res2 = await signIn("credentials", {
        email: emailSave,
        password: passwordSave,
        redirect: false,
      })

      if (res2.ok)
        router.replace('/')
      else
        router.replace(UtilPath.SIGNIN)
    }
    catch (error) {
      return setServerMessage("Internal server error.")
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
            <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">University email</Label>
                  <Input id="email" placeholder="Enter your email (.edu)" required type="email" onChange={e => setEmail(e.target.value)}/>
                  {
                    emailError &&
                    <p className="text-red-500 text-sm">Email should be a university email ends with .edu</p>
                  }
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Password</Label>
                  <Input id="newPassword" required type="password" onChange={e => setPassword(e.target.value)} />
                  {
                    passwordError &&
                    <p className="text-red-500 text-sm">Your password must be have at least:
                      <br/> - 8 characters long <br/> - 1 uppercase & 1 lowercase <br/> - 1 number</p>
                  }
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" required type="password" onChange={e => setConfirmPassword(e.target.value)} />
                  {
                    confirmPasswordError &&
                    <p className="text-red-500 text-sm">Email should be a university email ends with .edu</p>
                  }
                </div>
                <p className="text-red-500 text-sm">{serverMessage}</p>
                {
                  onSubmitting ?
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
    </div>
)
}

