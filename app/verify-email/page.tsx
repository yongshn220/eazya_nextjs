"use client"

import { useSearchParams } from 'next/navigation'
import {Button} from "@components/ui/button";
import Link from "next/link";
import {UtilPath} from "@components/constants/enums";
import {useEffect, useState} from "react";
import verifyEmailVerification from "@actions/verification/verifyEmailVerification";
import {StatusCodes} from "@node_modules/http-status-codes";

const enum StatueType {
  PROCESSING,
  FAIL,
  SUCCESS
}

export default function VerifyPage() {
  const [token, setToken] = useState("")
  const [pageStatus, setPageStatus] = useState(StatueType.PROCESSING)

  const searchParams = useSearchParams()

  useEffect(() => {
    const verifyToken = searchParams.get('token')
    if (!verifyToken || verifyToken === "") {
      setPageStatus(StatueType.FAIL)
    }
    else {
      setToken(searchParams.get('token'))
    }
  }, [])

  useEffect(() => {
    verifyEmailVerification(token).then(res => {
      if (res.status === StatusCodes.OK) {
        setPageStatus(StatueType.SUCCESS)
      }
      else {
        setPageStatus(StatueType.FAIL)
      }
    })
  }, [token])

  return (
    <div className="flex-center flex-col w-full p-4 pt-20">
      {
        pageStatus === StatueType.PROCESSING &&
        <div className="flex-center flex-col w-full">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-4">Verifying email...</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
            Verifying your email... Please wait for few seconds.
          </p>
        </div>
      }
      {
        pageStatus === StatueType.SUCCESS &&
        <div className="flex-center flex-col w-full">
          <CheckIcon className="w-16 h-16 text-green-500 dark:text-green-400"/>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-4">Email Verified</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
            Thank you for verifying your email. You can now enjoy full access to our platform.
          </p>
        </div>
      }
      {
        pageStatus === StatueType.FAIL &&
        <div className="flex-center flex-col w-full">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-4">Verification fail</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
            Your token is not valid. Please try again with new verification request.
          </p>
        </div>
      }
      <Link href={UtilPath.SIGNIN}>
        <Button className="mt-8 px-8 py-2">Sign In</Button>
      </Link>
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
