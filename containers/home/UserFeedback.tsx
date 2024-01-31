'use client'

import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"
import {MailFilledIcon, YoutubeFilledIcon} from "@components/icon/icons";
import Image from 'next/image'
import createUserFeedbackAction from "@actions/userFeedback/createUserFeedbackAction";
import {StatusCodes} from "@node_modules/http-status-codes";
import {useState} from "react";

export default function UserFeedback() {
  const [content, setContent] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    const res = await createUserFeedbackAction(content)
    if (res.status == StatusCodes.OK) {
      alert("Thank you for your feedback! We will update it as soon as possible.")
    }
    setContent("")
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8 border-t border-gray-300">
      <div className="flex-center gap-4 text-gray-500">
        <Image src="/assets/images/eazyaLogo.png" alt="EazyA logo" width={30} height={30} className="object-contain"/>
        <a href="https://www.youtube.com/@EazyA_official">
          <YoutubeFilledIcon/>
        </a>
        <a href="mailto:someone@example.com?subject=Feedback&body=Please%20write%20your%20feedback%20here.">
          <MailFilledIcon/>
        </a>
      </div>
      <div className="max-w-lg w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">We'd love to hear your feedback</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please fill out the form below and we'll update it as soon as possible.
          </p>
        </div>
        <form className="flex-center flex-col mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="w-full rounded-md shadow-sm -space-y-px">
            <Label htmlFor="message">Message</Label>
            <Textarea
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none sm:text-sm"
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="flex w-full">
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
