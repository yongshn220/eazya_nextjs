"use client"

import InputFieldDefault from "@components/input/InputFieldDefault";
import {Button} from "@components/ui/button";
import {Checkbox} from "@components/ui/checkbox";
import useCreateComment from "@components/post/comment/useCreateComment";

export default function CreateComment({comment, setComment}) {
  const createCommentMutation = useCreateComment()

  return (
    <section className="mt-10">
      <p className="text-lg">5 Comments</p>
      <div className="flex flex-col glassmorphism mt-4 p-4 gap-5">
        <InputFieldDefault/>
        <div className="flex-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" onClick={(v) => console.log('v', v)}/>
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Secret Comment
            </label>
          </div>
          <Button>Post</Button>
        </div>
      </div>
    </section>
  )
}
