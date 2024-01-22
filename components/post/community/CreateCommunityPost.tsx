"use client"

import {useState} from "react";
import {CommunityType, FormMode, PostType} from "@components/constants/enums";
import createCommunityPostAction from "@actions/community/createCommunityPostAction";
import {CreateGeneralPostRequest} from "@models/requests/CreateGeneralPostRequest";
import {CommunityFormRequest} from "@models/requests/CommunityFormRequest";
import CommunityForm from "@components/post/community/CommunityForm";

interface Props {
  postType: PostType;
  communityType: CommunityType;
}

export default function CreateCommunityPost({postType, communityType}: Props) {
  const [post, setPost] = useState<CommunityFormRequest>({
    postType,
    communityType: communityType,
    title: "",
    description: "",
  })

  function handleSubmit(e) {
    e.preventDefault()

    const req: CommunityFormRequest = {...post}
    createCommunityPostAction(req).then()
  }

  return (
    <section className="w-full">
      <CommunityForm mode={FormMode.CREATE} post={post} setPost={setPost} submitHandler={handleSubmit}/>
    </section>
  )
}