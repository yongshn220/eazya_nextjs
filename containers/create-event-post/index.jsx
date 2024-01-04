"use client"
import EventForm from "@containers/create-event-post/EventForm";
import {useState} from "react";
import {FormMode} from "@components/constants/enums";

export default function CreateEventPost() {
  const [eventPost, setEventPost] = useState({
    authorId: "",
    universityId: "",
    image: "",
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  })

  return (
    <section className="w-full">
      <EventForm mode={FormMode.CREATE} post={eventPost} setPost={setEventPost}/>
    </section>
  )
}
