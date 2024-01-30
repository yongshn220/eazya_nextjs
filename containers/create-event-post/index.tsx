"use client"

import EventForm from "@containers/create-event-post/EventForm";
import {FormMode, PostType} from "@components/constants/enums";
import createEventPostAction from "@actions/event/createEventPostAction";
import {EventFormRequest} from "@models/requests/EventFormRequest";
import {useState} from "react";
import {useRouter} from 'next/navigation'
import {getHomePath} from "@components/constants/tags";
import {uploadFile} from "@components/constants/firebaseHelper";

export interface ImageData {
  file: File;
  url: string;
  isLoading: boolean;
}

export default function CreateEventPost() {
  const router = useRouter()
  const [image, setImage] = useState<ImageData>({file: null, url: "", isLoading: false})
  const [eventPost, setEventPost] = useState<EventFormRequest>({
    image: "",
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  })
  const [loading, setLoading] = useState<boolean>(false)


  async function handleSubmit(e) {
    try {
      e.preventDefault()
      setLoading(true)

      let imageUrl = (image.file)? await uploadFile(PostType.EVENT, image.file) : ""

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
        setPost={setEventPost}
        image={image}
        setImage={setImage}
        submitHandler={handleSubmit}
        loading={loading}
      />
    </section>
  )
}
