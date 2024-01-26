"use client"

import EventForm from "@containers/create-event-post/EventForm";
import {FormMode} from "@components/constants/enums";
import createEventPostAction from "@actions/event/createEventPostAction";
import {EventFormRequest} from "@models/requests/EventFormRequest";
import {useState} from "react";
import {StatusCodes} from "@node_modules/http-status-codes";


export default function CreateEventPost() {
  const [eventPost, setEventPost] = useState<EventFormRequest>({
    image: "",
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  })
  const [loading, setLoading] = useState<boolean>(false)

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const req: EventFormRequest = {...eventPost}
    createEventPostAction(req).then(({status}) => {
      setLoading(false)
      if (status !== StatusCodes.OK) {
        console.log("Fail to create the post.", status)
      }
    })
  }

  return (
    <section className="w-full">
      <EventForm
        mode={FormMode.CREATE}
        post={eventPost}
        setPost={setEventPost}
        submitHandler={handleSubmit}
        loading={loading}
      />
    </section>
  )
}
