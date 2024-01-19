"use client"

import {useState} from "react";
import GeneralForm from "@containers/create-general-post/GeneralForm";
import {CommunityType} from "@components/constants/enums";
import createCommunityPostAction from "@actions/community/createCommunityPostAction";
import {CreateGeneralPostRequest} from "@models/requests/CreateGeneralPostRequest";

export default function CreateGeneralPost({type}: {type: CommunityType}) {
  const [generalPost, setGeneralPost] = useState<CreateGeneralPostRequest>({
    communityType: type,
    title: "",
    description: "",
  })

  function handleSubmit(e) {
    e.preventDefault()

    const req: CreateGeneralPostRequest = {...generalPost}
    createCommunityPostAction(req).then(() => {

    })
  }

  return (
    <section className="w-full">
      <GeneralForm mode="Create" post={generalPost} setPost={setGeneralPost} submitHandler={handleSubmit}/>
    </section>
  )
}
