"use client"
import StoreForm from "@containers/create-store-post/StoreForm";
import {useState} from "react";
import {FormMode} from "@components/constants/enums";
import {CreateStorePostRequest} from "@models/requests/CreateStorePostRequest"
import createStorePostAction from "@actions/store/createStorePostAction";

export default function CreateStorePost() {
  const [storePost, setStorePost] = useState<CreateStorePostRequest>({
    title: "",
    price: "",
    description: "",
    images: [],
  })

  function handleSubmit(e) {
    e.preventDefault()

    console.log("handle submit")
    const req: CreateStorePostRequest = {...storePost}
    createStorePostAction(req).then(() => {

    })
  }

  return (
    <section className="w-full">
      <StoreForm mode={FormMode.CREATE} post={storePost} setPost={setStorePost} submitHandler={handleSubmit}/>
    </section>
  )
}
