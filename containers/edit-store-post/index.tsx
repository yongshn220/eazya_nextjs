"use client"

import StoreForm from "@containers/create-store-post/StoreForm";
import {useState} from "react";
import {FormMode, PostType} from "@components/constants/enums";
import {StoreFormRequest} from "@models/requests/StoreFormRequest"
import editStorePostAction from "@actions/store/editStorePostAction";
import {useRouter} from "next/navigation";
import {upload} from "@vercel/blob/client";
import {del} from "@vercel/blob";
import {getHomePath} from "@components/constants/tags";
import {StatusCodes} from "@node_modules/http-status-codes";

export interface ImageData {
  id: string;
  file: File;
  url: string;
  isLoading: boolean;
}

export default function EditStorePost({post}) {
  const router = useRouter()
  const [images, setImages] = useState<Array<ImageData>>(post.images.map(((url) => ({id: "", file: null, url: url, isLoading: false}))))
  const [storePost, setStorePost] = useState<StoreFormRequest>({
    images: [], // not using
    title: post.title,
    price: post.price,
    description: post.description,
  })
  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmit(e) {
    try {
      e.preventDefault()
      setLoading(true)

      const curImageUrls = images.map((i) => i.url)
      const curImageFiles = images.map((i) => i.file).filter(file => !!file)

      const urlsToDelete = post.images.filter(url => !curImageUrls.includes(url));
      const urlsToKeep = post.images.filter(url => curImageUrls.includes(url));

      const urlsToAdd = []
      for (const file of curImageFiles) {
        const blob = await upload("store/"+file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/store/upload',
        })
        urlsToAdd.push(blob.url)
      }
      // for (const url of urlsToDelete) {
      //   await del(url, {token: process.env.BLOB_READ_WRITE_TOKEN})
      // }
      const res = await editStorePostAction(urlsToDelete, post.id, {...storePost, images: [...urlsToKeep, ...urlsToAdd]})
      if (res.status !== StatusCodes.OK) console.log(res)
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
        mode={FormMode.EDIT}
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
