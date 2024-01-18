import FormHeader from "@components/headers/FormHeader";
import Link from 'next/link'
import {Button} from "@components/ui/button";
import {CreateStorePostRequest} from "@models/requests/CreateStorePostRequest";
import InputFieldDefaultClient from "@components/input/InputFieldDefaultClient";
import InputFieldDescriptionClient from "@components/input/InputFieldDescriptionClient";
import MultipleImageUploader from "@components/image/MultipleImageUploader";
import {useEffect, useState} from "react";
import Image from 'next/image'
import LoadingCircle from "@components/animation/LoadingCircle";

const MAX_IMAGE_COUNT = 5

interface Props {
  mode: string;
  post: CreateStorePostRequest;
  setPost: any;
  submitHandler: Function;
}

export interface Image {
  id: number;
  url: string;
  isLoading: boolean;
}

export default function StoreForm({mode, post, setPost, submitHandler}: Props) {
  const [images, setImages] = useState<Array<Image>>([])

  useEffect(() => {

  }, [images])


  return (
    <div className="w-full">
      <FormHeader
        mode={mode}
        title="Item"
        subtitle="Sell second-hand bulabula"
      />
      <form className="flex-center flex-col glassmorphism mt-10 gap-4 sm:gap-12">
        <div className="w-full">
          <span className="font-satoshi font-semibold text-base text-gray-700">Image</span>
            <div className="w-full flex gap-6 mt-2 pb-2 overflow-x-auto">
              <MultipleImageUploader images={images} setImages={setImages} maxNum={MAX_IMAGE_COUNT}>
                <div className="shrink-0 flex-center flex-col w-[8rem] h-[8rem] border-2 rounded-lg break-inside-avoid cursor-pointer hover:border-blue-300">
                  <p className="text-gray-500">upload</p>
                  <p className="text-gray-500">{`${images?.length} / ${MAX_IMAGE_COUNT}`}</p>
                </div>
              </MultipleImageUploader>
              {
                images.map((image) => (
                  <div key={image.id} className="shrink-0 flex-center w-[8rem] h-[8rem] border-2 rounded-lg">
                    {
                      image.isLoading ?
                      <LoadingCircle/>
                        :
                      <Image src={image.url} width={100} height={100} alt="store post image"/>
                    }
                  </div>
                ))
              }
            </div>
        </div>

        <InputFieldDefaultClient name="Title" value={post.title} onChangeHandler={(e) => setPost({...post, title: e.target.value})} placeholder="Title"/>
        <InputFieldDefaultClient name="Price" value={post.price} onChangeHandler={(e) => setPost({...post, date: e.target.value})} placeholder="Price"/>
        <InputFieldDescriptionClient name="Description" value={post.description} onChangeHandler={(e) => setPost({...post, description: e.target.value})} placeholder="Description" />
        <div className="w-full flex-end mb-5 gap-7">
          <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
          <Button>{mode}</Button>
        </div>
      </form>
    </div>
  )
}
