"use client"

import InputFieldDefault from "@components/input/InputFieldDefault";
import {Button} from "@components/ui/button";
import {Checkbox} from "@components/ui/checkbox";
import useCreateComment from "@components/post/comment/useCreateComment";
import {useState} from "react";
import {CreateCommentRequest} from "@models/requests/CreateCommentRequest";

export default function CreateComment({postType, postId}) {
  const [comment, setComment] = useState({content: "", isSecret: false})
  const createCommentMutation = useCreateComment(postId)

  function handleSubmit(e: any) {
    e.preventDefault()
    const req: CreateCommentRequest = { postType, postId, content: comment.content, isSecret:comment.isSecret }
    createCommentMutation.mutate(req)
  }

  return (
    <form className="mt-10" onSubmit={handleSubmit}>
      <p className="text-lg">5 Comments</p>
      <div className="flex flex-col glassmorphism mt-4 p-4 gap-5">
        <InputFieldDefault title="" value={comment.content} placeholder="Add a comment..." onChangeHandler={(e) => {setComment(prev => ({...prev, content:e.target.value}))}}/>
        <div className="flex-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" onClick={() => {setComment(prev => ({...prev, isSecret: !prev.isSecret}))}}/>
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Secret Comment
            </label>
          </div>
          <Button type="submit">Post</Button>
        </div>
      </div>
    </form>
  )
}
