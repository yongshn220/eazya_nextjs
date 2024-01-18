"use client"

import {useState} from "react";
import GeneralForm from "@containers/create-general-post/GeneralForm";
import {GeneralCommunityType} from "@components/constants/enums";
import createGeneralPostAction from "@actions/general/createGeneralPostAction";
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
    createGeneralPostAction(req).then(() => {

    })
  }

  return (
    <section className="w-full">
      <GeneralForm mode="Create" post={generalPost} setPost={setGeneralPost} submitHandler={handleSubmit}/>
    </section>
  )
}
