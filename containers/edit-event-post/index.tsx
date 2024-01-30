"use client"

import EventForm from "@containers/create-event-post/EventForm";
import {FormMode, PostType} from "@components/constants/enums";
import {EventFormRequest} from "@models/requests/EventFormRequest";
import {useState} from "react";
import editEventPostAction from "@actions/event/editEventPostAction";
import {useRouter} from "@node_modules/next/navigation";
import {getHomePath} from "@components/constants/tags";
import {deleteFile, uploadFile} from "@components/constants/firebaseHelper";
import {StatusCodes} from "@node_modules/http-status-codes";


export interface ImageData {
  file: File;
  url: string;
  isLoading: boolean;
}

export default function EditEventPost({post}) {
  const router = useRouter()
  const [image, setImage] = useState<ImageData>({file: null, url: post.image, isLoading: false})
  const [eventPost, setEventPost] = useState<EventFormRequest>({
    image: "",
    title: post.title,
    date: post.date,
    time: post.time,
    location: post.location,
    description: post.description,
  })
  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmit(e) {
    try {
      e.preventDefault()
      setLoading(true)

      if (image.file) {
        await uploadFile(PostType.EVENT, image.file)
      }
      if (post.image !== image.url) {
        await deleteFile(post.image)
      }

      const res = await editEventPostAction(post.id, {...eventPost, image: image.url})
      if (res.status !== StatusCodes.OK) console.log(res.status)

    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
      router.replace(getHomePath(PostType.EVENT))
    }
  }

  return (
    <section className="w-full">
      <EventForm
        mode={FormMode.EDIT}
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
