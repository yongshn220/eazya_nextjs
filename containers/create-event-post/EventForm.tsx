import FormHeader from "@components/headers/FormHeader";
import Link from 'next/link'
import {Button} from "@components/ui/button";
import React, {useState} from "react";
import InputFieldDefaultClient from "@components/input/InputFieldDefaultClient";
import {EventFormRequest} from "@models/requests/EventFormRequest";
import InputFieldDescriptionClient from "@components/input/InputFieldDescriptionClient";
import ImageContainer from "@containers/create-event-post/ImageContainer";
import SingleImageUploader from "@components/image/SingleImageUploader";
import LoadingCircle from "@components/animation/LoadingCircle";
import Image from "@node_modules/next/image";
import {Cross2Icon} from "@node_modules/@radix-ui/react-icons";


interface Props {
  mode: string;
  post: EventFormRequest;
  setPost: any;
  submitHandler: Function;
  loading: boolean;
}


export default function EventForm({mode, post, setPost, submitHandler, loading}: Props) {
  const [imageLoading, setImageLoading] = useState(false)

  function handleRemoveImage(e) {
    e.preventDefault()
    setPost(prev => ({...prev, image: ""}))
    setImageLoading(false)
  }

  // TODO: handle mobile viewport
  return (
    <div className="w-full">
      <FormHeader mode={mode} title="Event" subtitle="Share the upcoming event on the campus"/>
      <form className="flex-center flex-col glassmorphism mt-10 gap-4 sm:gap-12" onSubmit={(e) => submitHandler(e)}>
        {/* Image uploader for mobile */}
        <SingleImageUploader setImage={(image: string) => setPost(prev => ({...prev, image: image}))} disabled={false} setIsLoading={setImageLoading}>
          <span className="font-satoshi font-semibold text-base text-gray-700">Image</span>
          <div
            className="relative flex-center sm:hidden w-full h-[10rem] mt-2 border rounded-lg break-inside-avoid cursor-pointer group">
            {post.image
              ? <div>
                {imageLoading
                  ? <LoadingCircle/>
                  : <div>
                    <Image src={post.image} layout="fill" className="object-contain" alt="EventImage"/>
                    <Cross2Icon className="absolute right-0 top-0 m-3 cursor-pointer" width={20} height={20}
                                onClick={handleRemoveImage}/>
                  </div>
                }
              </div>
              : <p className={`text-gray-500 hover_text_blue`}>Add Image</p>
            }
          </div>
        </SingleImageUploader>

        <div className="w-full flex flex-row sm:h-[24rem] ">
          <div className="w-full flex-between flex-col sm:mr-10 gap-4 sm:gap-0">
            <InputFieldDefaultClient name="Title" value={post.title} placeholder="Title" onChangeHandler={(e) => setPost(prev => ({...prev, title: e.target.value}))}/>
            <InputFieldDefaultClient name="Date" value={post.date} placeholder="Date" onChangeHandler={(e) => setPost(prev => ({...prev, date: e.target.value}))}/>
            <InputFieldDefaultClient name="Time" value={post.time} placeholder="Time" onChangeHandler={(e) => setPost(prev => ({...prev, time: e.target.value}))}/>
            <InputFieldDefaultClient name="Location" value={post.location} placeholder="Location" onChangeHandler={(e) => setPost(prev => ({...prev, location: e.target.value}))}/>
          </div>
          <div className="flex flex-col h-full gap-3">
            {/* Image uploader for desktop */}
            <span className="hidden sm:flex font-satoshi font-semibold text-base text-gray-700">Image</span>
            <SingleImageUploader setImage={(image: string) => setPost(prev => ({...prev, image: image}))} disabled={false} setIsLoading={setImageLoading}>
              <div
                className={`relative hidden sm:flex justify-center items-center w-[18rem] h-full border rounded-lg group ${post.image ? '' : 'cursor-pointer hover:border-blue-300'}`}>
                {post.image
                  ? <div>
                    {imageLoading
                      ? <LoadingCircle/>
                      : <div>
                        <Image src={post.image} layout="fill" className="object-contain" alt="EventImage"/>
                        <Cross2Icon className="absolute right-0 top-0 m-3 cursor-pointer" width={20} height={20}
                                    onClick={handleRemoveImage}/>
                      </div>
                    }
                  </div>
                  : <p className={`text-gray-500 hover_text_blue`}>Add Image</p>
                }
              </div>
            </SingleImageUploader>
          </div>
        </div>
        <InputFieldDescriptionClient name="Description" value={post.description} placeholder="Description" onChangeHandler={(e) => setPost(prev => ({...prev, description: e.target.value}))}/>
        <div className="w-full flex-end mb-5 gap-7">
          <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
          { loading
            ? <Button disabled={true}>{mode}...</Button>
            : <Button type="submit">{mode}</Button>
          }
        </div>
      </form>
    </div>
  )
}
