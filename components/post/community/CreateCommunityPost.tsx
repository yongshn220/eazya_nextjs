"use client"

import {useState} from "react";
import {CommunityType, PostType} from "@components/constants/enums";
import createCommunityPostAction from "@actions/community/createCommunityPostAction";
import {CreateGeneralPostRequest} from "@models/requests/CreateGeneralPostRequest";
import {CreateCommunityRequestBase} from "@models/base/CreateCommunityRequestBase";
import CommunityForm from "@components/post/community/CommunityForm";

interface Props {
  postType: PostType;
  communityType: CommunityType;
}

export default function CreateCommunityPost({postType, communityType}: Props) {
  const [post, setPost] = useState<CreateCommunityRequestBase>({
    postType,
    communityType: communityType,
    title: "",
    description: "",
  })

  function handleSubmit(e) {
    e.preventDefault()

    const req: CreateGeneralPostRequest = {...post}
    createCommunityPostAction(req).then(() => {

    })
  }

  return (
    <section className="w-full">
      <CommunityForm mode="Create" post={post} setPost={setPost} submitHandler={handleSubmit}/>
    </section>
  )
}
