"use client"

import StoreForm from "@containers/create-store-post/StoreForm";
import {useState} from "react";
import {FormMode, PostType} from "@components/constants/enums";
import {StoreFormRequest} from "@models/requests/StoreFormRequest"
import createStorePostAction from "@actions/store/createStorePostAction";
import {useRouter} from "next/navigation";
import {getHomePath} from "@components/constants/tags";
import {StatusCodes} from "@node_modules/http-status-codes";
import {uploadFile} from "@components/constants/firebaseHelper";

export interface ImageData {
  id: string;
  file: File;
  url: string;
  isLoading: boolean;
}

export default function CreateStorePost() {
  const router = useRouter()
  const [images, setImages] = useState<Array<ImageData>>([])
  const [storePost, setStorePost] = useState<StoreFormRequest>({
    images: [], // not using
    title: "",
    price: "",
    description: "",
  })
  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmit(e) {
    try {
      e.preventDefault()
      setLoading(true)

      const curImageFiles = images.map((i) => i.file).filter(file => !!file)
      const uploadPromises = curImageFiles.map((file) => uploadFile(PostType.STORE, file))
      const urlsToAdd = await Promise.all(uploadPromises) as Array<string>

      const res = await createStorePostAction({...storePost, images: urlsToAdd})
      if (res.status !== StatusCodes.OK) console.log(res.status)
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
      router.replace(getHomePath(PostType.STORE))
    }
  }

  return (
    <section className="w-full">
      <StoreForm
        mode={FormMode.CREATE}
        post={storePost}
        setPost={setStorePost}
        images={images}
        setImages={setImages}
        submitHandler={handleSubmit}
        loading={loading}
      />
    </section>
  )
}
