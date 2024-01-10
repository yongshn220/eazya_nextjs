"use client"

import InputFieldDefault from "@components/input/InputFieldDefault";
import {Button} from "@components/ui/button";
import {Checkbox} from "@components/ui/checkbox";
import {useState} from "react";
import {CreateReplyRequest} from "@models/requests/CreateReplyRequest";
import useCreateReply from "@components/post/comment/useCreateReply";

export default function CreateReply({postType, postId, commentId}) {
  const [reply, setReply] = useState({content: "", isSecret: false})
  const createReplyMutation = useCreateReply()

  function handleSubmit(e: any) {
    e.preventDefault()
    const req: CreateReplyRequest = { postType, postId, commentId, content: reply.content, isSecret:reply.isSecret }
    createReplyMutation.mutate(req)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col glassmorphism mt-4 p-4 gap-5">
        <InputFieldDefault title="" value={reply.content} placeholder="Add a reply..." onChangeHandler={(e) => {setReply(prev => ({...prev, content:e.target.value}))}}/>
        <div className="flex-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" onClick={() => {setReply(prev => ({...prev, isSecret: !prev.isSecret}))}}/>
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Secret Reply
            </label>
          </div>
          <Button type="submit">Post</Button>
        </div>
      </div>
    </form>
  )
}