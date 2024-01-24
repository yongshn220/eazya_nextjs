"use client"

import {Button} from "@components/ui/button";
import {Checkbox} from "@components/ui/checkbox";
import {useState} from "react";
import {CreateCommentRequest} from "@models/requests/CreateCommentRequest";
import InputFieldDefaultClient from "@components/input/InputFieldDefaultClient";
import createCommentAction from "@actions/comment/createCommentAction";
import {useSession} from "next-auth/react";

export default function CreateComment({postType, postId}) {
  const [comment, setComment] = useState({content: "", isSecret: false})
  const { data: session } = useSession()

  async function handleSubmit(e: any) {
    e.preventDefault()
    const req: CreateCommentRequest = { postType, postId, content: comment.content, isSecret:comment.isSecret }
    await createCommentAction(req)
    setComment((prev) => ({...prev, content: ""}))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col glassmorphism mt-4 p-4 gap-5">
        <InputFieldDefaultClient name="" value={session? comment.content : "Please signin to add a comment."} placeholder="Add a comment..." onChangeHandler={(e) => {setComment(prev => ({...prev, content:e.target.value}))}}/>
        <div className="flex-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" disabled={!session} onClick={() => {setComment(prev => ({...prev, isSecret: !prev.isSecret}))}}/>
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Secret Comment
              </label>
            </div>
            <p className="text-xs font-medium text-gray-500">Only you and author can see it.</p>
          </div>
          <Button type="submit" disabled={!session}>Post</Button>
        </div>
      </div>
    </form>
  )
}
