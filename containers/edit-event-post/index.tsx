"use client"

import EventForm from "@containers/create-event-post/EventForm";
import {FormMode} from "@components/constants/enums";
import {EventFormRequest} from "@models/requests/EventFormRequest";
import {useState} from "react";
import editEventPostAction from "@actions/event/editEventPostAction";


export default function EditEventPost({post}) {
  const [eventPost, setEventPost] = useState<EventFormRequest>({
    image: post.image,
    title: post.title,
    date: post.date,
    time: post.time,
    location: post.location,
    description: post.description,
  })
  const [loading, setLoading] = useState<boolean>(false)

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const req: EventFormRequest = {...eventPost}
    editEventPostAction(post.id, req).then((res) => {
      setLoading(false)
      if (!res) {
        console.log("Fail to edit the post.")
      }
    })
  }

  return (
    <section className="w-full">
      <EventForm
        mode={FormMode.EDIT}
        post={eventPost}
        setPost={setEventPost}
        submitHandler={handleSubmit}
        loading={loading}
      />
    </section>
  )
}
