"use client"
import StoreForm from "@containers/create-store-post/StoreForm";
import {useState} from "react";
import {FormMode} from "@components/constants/enums";
import {StoreFormRequest} from "@models/requests/StoreFormRequest"
import createStorePostAction from "@actions/store/createStorePostAction";

export default function CreateStorePost() {
  const [storePost, setStorePost] = useState<StoreFormRequest>({
    title: "",
    price: "",
    description: "",
    images: [],
  })
  const [loading, setLoading] = useState<boolean>(false)

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const req: StoreFormRequest = {...storePost}
    createStorePostAction(req).then((res) => {
      setLoading(false)
      if (!res) {
        console.log("Fail to create post")
      }
    })
  }

  return (
    <section className="w-full">
      <StoreForm
        mode={FormMode.CREATE}
        post={storePost}
        setPost={setStorePost}
        submitHandler={handleSubmit}
        loading={loading}
      />
    </section>
  )
}
