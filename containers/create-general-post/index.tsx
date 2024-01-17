"use client"

import {useState} from "react";
import GeneralForm from "@containers/create-general-post/GeneralForm";
import {GeneralCommunityType} from "@components/constants/enums";
import createGeneralAction from "@actions/general/createGeneralAction";
import {CreateGeneralPostRequest} from "@models/requests/CreateGeneralPostRequest";

export default function CreateGeneralPost({type}: {type: GeneralCommunityType}) {
  const [generalPost, setGeneralPost] = useState<CreateGeneralPostRequest>({
    communityType: type,
    title: "",
    description: "",
  })

  function handleSubmit(e) {
    e.preventDefault()

    const req: CreateGeneralPostRequest = {...generalPost}
    console.log(req)
    createGeneralAction(req).then(() => {

    })
  }

  return (
    <section className="w-full">
      <GeneralForm mode="Create" post={generalPost} setPost={setGeneralPost} submitHandler={handleSubmit}/>
    </section>
  )
}
