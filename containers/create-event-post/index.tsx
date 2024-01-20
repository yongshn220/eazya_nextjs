"use client"

import EventForm from "@containers/create-event-post/EventForm";
import {FormMode} from "@components/constants/enums";
import createEventPostAction from "@actions/event/createEventPostAction";
import {EventFormRequest} from "@models/requests/EventFormRequest";
import {useState} from "react";


export default function CreateEventPost() {
  const [eventPost, setEventPost] = useState<EventFormRequest>({
    image: "",
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  })

  function handleSubmit(e) {
    e.preventDefault()

    const req: EventFormRequest = {...eventPost}
    createEventPostAction(req).then()
  }

  return (
    <section className="w-full">
      <EventForm
        mode={FormMode.CREATE}
        post={eventPost}
        setPost={setEventPost}
        submitHandler={handleSubmit}
      />
    </section>
  )
}
