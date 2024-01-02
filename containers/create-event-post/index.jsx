"use client"
import EventForm from "@containers/create-event-post/EventForm";
import {useState} from "react";

export default function CreateEventPost() {
  const [eventPost, setEventPost] = useState({
    title: "",
    location: "",
    description: "",
    date: "",
    image: "",
  })

  return (
    <section className="w-full">
      <EventForm mode="Create" post={eventPost} setPost={setEventPost}/>
    </section>
  )
}
