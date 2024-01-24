"use client"

import {Button} from "@components/ui/button";
import {Checkbox} from "@components/ui/checkbox";
import {useState} from "react";
import {CreateReplyRequest} from "@models/requests/CreateReplyRequest";
import InputFieldDefaultClient from "@components/input/InputFieldDefaultClient";
import createReplyAction from "@actions/reply/createReplyAction";
import {useSession} from "@node_modules/next-auth/react";

export default function CreateReply({postType, postId, commentId}) {
  const [reply, setReply] = useState({content: "", isSecret: false})
  const { data: session } = useSession()


  async function handleSubmit(e: any) {
    e.preventDefault()
    const req: CreateReplyRequest = { postType, postId, commentId, content: reply.content, isSecret:reply.isSecret }
    await createReplyAction(req)
    setReply((prev) => ({...prev, content: ""}))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col glassmorphism p-4 gap-5">
        <InputFieldDefaultClient name="" value={session? reply.content : "Please login to reply."} placeholder="Add a reply..." onChangeHandler={(e) => {setReply(prev => ({...prev, content:e.target.value}))}}/>
        <div className="flex-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" disabled={!session} onClick={() => {setReply(prev => ({...prev, isSecret: !prev.isSecret}))}}/>
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Secret Reply
              </label>
            </div>
            <p className="text-xs font-medium text-gray-500">Only you and commentator can see it.</p>
          </div>
          <Button type="submit" disabled={!session}>Post</Button>
        </div>
      </div>
    </form>
  )
}
