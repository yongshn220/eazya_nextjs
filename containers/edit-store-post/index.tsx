"use client"
import StoreForm from "@containers/create-store-post/StoreForm";
import {useState} from "react";
import {FormMode} from "@components/constants/enums";
import {StoreFormRequest} from "@models/requests/StoreFormRequest"
import editStorePostAction from "@actions/store/editStorePostAction";

export default function EditStorePost({post}) {
  const [storePost, setStorePost] = useState<StoreFormRequest>({
    title: post.title,
    price: post.price,
    description: post.description,
    images: post.images,
  })

  function handleSubmit(e) {
    e.preventDefault()

    const req: StoreFormRequest = {...storePost}
    editStorePostAction(post.id, req).then()
  }

  return (
    <section className="w-full">
      <StoreForm
        mode={FormMode.CREATE}
        post={storePost}
        setPost={setStorePost}
        submitHandler={handleSubmit}
      />
    </section>
  )
}
