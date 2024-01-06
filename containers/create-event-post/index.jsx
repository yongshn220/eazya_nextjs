"use client"
import EventForm from "@containers/create-event-post/EventForm";
import {useState} from "react";
import {FormMode} from "@components/constants/enums";
import {useRouter} from "next/navigation";
import useCreateEventPost from "@containers/create-event-post/useCreateEventPost";

export default function CreateEventPost() {
  const router = useRouter()
  const createEventPostMutation = useCreateEventPost()
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [eventPost, setEventPost] = useState({
    universityId: "",
    image: "",
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  })

  function handleSubmit(e) {
    e.preventDefault()
    createEventPostMutation.mutate(eventPost)
    router.push('/events')
  }

  return (
    <section className="w-full">
      <EventForm
        mode={FormMode.CREATE}
        post={eventPost}
        setPost={setEventPost}
        isImageLoading={isImageLoading}
        setIsImageLoading={setIsImageLoading}
        handleSubmit={handleSubmit}
      />
    </section>
  )
}
