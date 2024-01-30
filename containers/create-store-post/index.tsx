"use client"
import StoreForm from "@containers/create-store-post/StoreForm";
import {useState} from "react";
import {FormMode, PostType} from "@components/constants/enums";
import {StoreFormRequest} from "@models/requests/StoreFormRequest"
import createStorePostAction from "@actions/store/createStorePostAction";
import {upload} from "@vercel/blob/client";
import {useRouter} from "next/navigation";
import {getHomePath} from "@components/constants/tags";
import {StatusCodes} from "@node_modules/http-status-codes";

export default function CreateStorePost() {
  const router = useRouter()
  const [imageFiles, setImageFiles] = useState<Array<File>>([])
  const [storePost, setStorePost] = useState<StoreFormRequest>({
    images: [],
    title: "",
    price: "",
    description: "",
  })
  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmit(e) {
    try {
      e.preventDefault()
      setLoading(true)

      let imageUrls = []
      for (const file of imageFiles) {
        const blob = await upload("store/"+file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/store/upload',
        })
        imageUrls.push(blob.url)
      }
      const res = await createStorePostAction({...storePost, images: imageUrls})
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
        setImageFiles={setImageFiles}
        submitHandler={handleSubmit}
        loading={loading}
      />
    </section>
  )
}
