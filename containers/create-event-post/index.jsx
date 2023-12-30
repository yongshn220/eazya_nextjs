"use client"
import ContentFormHeader from "@components/contents/ContentFormHeader";
import EventForm from "@components/event/EventForm";
import {useState} from "react";

export default function CreateEventPost() {
  const [eventPost, setEventPost] = useState({
    title: "",
    timestamp: 0,
    location: "",
    description: "",
  })

  return (
    <section className="w-full">
      <EventForm mode="Create" post={eventPost} setPost={setEventPost}/>
    </section>
  )
}
