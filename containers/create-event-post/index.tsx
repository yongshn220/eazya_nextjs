"use client"

import { upload } from '@vercel/blob/client';
import EventForm from "@containers/create-event-post/EventForm";
import {FormMode, PostType} from "@components/constants/enums";
import createEventPostAction from "@actions/event/createEventPostAction";
import {EventFormRequest} from "@models/requests/EventFormRequest";
import {useState} from "react";
import {useRouter} from 'next/navigation'
import {getHomePath} from "@components/constants/tags";


export default function CreateEventPost() {
  const [imageFile, setImageFile] = useState<File>(null)
  const [eventPost, setEventPost] = useState<EventFormRequest>({
    image: "",
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  })
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()


  async function handleSubmit(e) {
    try {
      e.preventDefault()
      setLoading(true)

      let imageUrl = ""
      if (imageFile) {
        const blob = await upload("event/"+imageFile.name, imageFile, {
          access: 'public',
          handleUploadUrl: '/api/event/upload',
        })
        imageUrl = blob.url
      }

      await createEventPostAction({...eventPost, image: imageUrl})
    }
    catch (error) {
      console.log("Fail to submit post.")
    }
    finally {
      setLoading(false)
      router.replace(getHomePath(PostType.EVENT))
    }
  }


  return (
    <section className="w-full">
      <EventForm
        mode={FormMode.CREATE}
        post={eventPost}
        setImageFile={setImageFile}
        setPost={setEventPost}
        submitHandler={handleSubmit}
        loading={loading}
      />
    </section>
  )
}
