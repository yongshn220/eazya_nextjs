"use client"
import StoreForm from "@containers/create-store-post/StoreForm";
import {useState} from "react";

export default function CreateStorePost() {
  const [storePost, setStorePost] = useState({
    title: "",
    price: "",
    description: "",
    images: [],
  })

  return (
    <section className="w-full">
      <StoreForm mode="Create" post={storePost} setPost={setStorePost}/>
    </section>
  )
}
