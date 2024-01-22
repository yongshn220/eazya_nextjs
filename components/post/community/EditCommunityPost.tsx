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
    title: post.title,
    description: post.description,
  })
  const [loading, setLoading] = useState<boolean>(false)

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const req: CommunityFormRequest = {...communityPost}
    editCommunityPostAction(post.id, req).then((res) => {
      setLoading(false)
      if (!res) {
        console.log("Fail to edit post")
      }
    })
  }

  return (
    <section className="w-full">
      <CommunityForm
        mode={FormMode.EDIT}
        post={communityPost}
        setPost={setCommunityPost}
        submitHandler={handleSubmit}
        loading={loading}
      />
    </section>
  )
}
