"use client"

import {useState} from "react";
import GeneralForm from "@containers/create-general-post/GeneralForm";
import {GeneralCommunityType} from "@components/constants/enums";
import createGeneralAction from "@actions/general/createGeneralAction";
import {CreateGeneralPostRequest} from "@models/requests/CreateGeneralPostRequest";

export default function CreateGeneralPost({tag}: {tag: GeneralCommunityType}) {
  const [generalPost, setGeneralPost] = useState<CreateGeneralPostRequest>({
    communityType: tag,
    title: "",
    description: "",
  })

  function handleSubmit() {
    const req: CreateGeneralPostRequest = {...generalPost}

    createGeneralAction(req).then(() => {

    })
  }

  return (
    <section className="w-full">
      <GeneralForm mode="Create" post={generalPost} setPost={setGeneralPost} submitHandler={handleSubmit}/>
    </section>
  )
}
