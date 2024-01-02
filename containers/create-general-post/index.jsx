"use client"
import {useState} from "react";
import GeneralForm from "@containers/create-general-post/GeneralForm";

export default function CreateGeneralPost() {
  const [generalPost, setGeneralPost] = useState({

  })

  return (
    <section className="w-full">
      <GeneralForm mode="Create" post={generalPost} setPost={setGeneralPost}/>
    </section>
  )
}
