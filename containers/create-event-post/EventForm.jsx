"use client"

import FormHeader from "@components/headers/FormHeader";
import Link from 'next/link'
import {Button} from "@components/ui/button";
import InputFieldDefault from "@components/input/InputFieldDefault";
import {hoveredTextColor} from "@components/constants/values";
import InputFieldDescription from "@components/input/InputFieldDescription";
import SingleImageUploader from "@components/image/SingleImageUploader";
import {useState} from "react";
import ImageContainer from "@containers/create-event-post/ImageContainer";

export default function EventForm({mode, post, setPost}) {
  const [isImageLoading, setIsImageLoading] = useState(false)

  function handleSubmit() {

  }

  return (
    <div className="w-full">
      <FormHeader
        mode={mode}
        title="Event"
        subtitle="Share the upcoming event on the campus"
      />
      <form className="flex-center flex-col glassmorphism mt-10 gap-4 sm:gap-12">
        <div
          className="flex-center sm:hidden w-[10rem] h-[10rem] mt-7 border border-dashed rounded-lg break-inside-avoid cursor-pointer group"
        >
          <p className={`text-gray-500 group-hover:${hoveredTextColor}`}>Add Image</p>
        </div>
        <div className="w-full flex flex-row sm:h-[24rem] ">
          <div className="w-full flex-between flex-col sm:mr-10 gap-4 sm:gap-0">
            <InputFieldDefault title="Title" value={post.title} onChangeHandler={(e) => setPost({...post, title: e.target.value})} placeholder="Title"/>
            <InputFieldDefault title="Date" value={post.date} onChangeHandler={(e) => setPost({...post, date: e.target.value})} placeholder="Date"/>
            <InputFieldDefault title="Time" value={post.time} onChangeHandler={(e) => setPost({...post, time: e.target.value})} placeholder="Time"/>
            <InputFieldDefault title="Location" value={post.location} onChangeHandler={(e) => setPost({...post, location: e.target.value})}  placeholder="Location"/>
          </div>
          <div className="flex flex-col h-full gap-3">
            <span className="font-satoshi font-semibold text-base text-gray-700">Image</span>
            <SingleImageUploader disabled={!!post.image} onLoadEnd={(result) => setPost({...post, image: result})} setIsLoading={setIsImageLoading}>
              <ImageContainer
                post={post}
                isImageLoading={isImageLoading}
                handleRemove={(e) => {
                  e.preventDefault()
                  setPost({...post, image: ""})
                }}
              />
            </SingleImageUploader>
          </div>

        </div>
        <InputFieldDescription title="Description" value={post.description}
                               onChangeHandler={(e) => setPost({...post, description: e.target.value})}
                               placeholder="Description"/>
        <div className="w-full flex-end mb-5 gap-7">
          <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
          <Button onClick={handleSubmit}>{mode}</Button>
        </div>
      </form>
    </div>
  )
}
