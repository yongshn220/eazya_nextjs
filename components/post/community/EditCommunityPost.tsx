"use client"

import {useState} from "react";
import {CommunityType, FormMode, PostType} from "@components/constants/enums";
import {CommunityFormRequest} from "@models/requests/CommunityFormRequest";
import CommunityForm from "@components/post/community/CommunityForm";
import editCommunityPostAction from "@actions/community/editCommunityPostAction";
import {ICommunityPost} from "@models/union/union";


export default function EditCommunityPost({post}: {post: ICommunityPost}) {
  const [communityPost, setCommunityPost] = useState<CommunityFormRequest>({
    postType: post.type as PostType,
    communityType: post.communityType as CommunityType,
    title: post.type,
    description: post.description,
  })

  function handleSubmit(e) {
    e.preventDefault()

    const req: CommunityFormRequest = {...communityPost}
    editCommunityPostAction(post.id, req).then()
  }

  return (
    <section className="w-full">
      <CommunityForm
        mode={FormMode.EDIT}
        post={communityPost}
        setPost={setCommunityPost}
        submitHandler={handleSubmit}
      />
    </section>
  )
}
