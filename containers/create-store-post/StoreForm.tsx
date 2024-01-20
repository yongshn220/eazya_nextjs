import FormHeader from "@components/headers/FormHeader";
import Link from 'next/link'
import {Button} from "@components/ui/button";
import {StoreFormRequest} from "@models/requests/StoreFormRequest";
import InputFieldDefaultClient from "@components/input/InputFieldDefaultClient";
import InputFieldDescriptionClient from "@components/input/InputFieldDescriptionClient";
import MultipleImageUploader from "@components/image/MultipleImageUploader";
import React, {useEffect, useState} from "react";
import Image from 'next/image'
import LoadingCircle from "@components/animation/LoadingCircle";
import {Cross2Icon} from "@node_modules/@radix-ui/react-icons";
import InputFieldPriceClient from "@components/input/InputFieldPriceClient";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;

const MAX_IMAGE_COUNT = 5

interface Props {
  mode: string;
  post: StoreFormRequest;
  setPost: any;
  submitHandler: Function;
}

export interface Image {
  id: string;
  url: string;
  isLoading: boolean;
}

export default function StoreForm({mode, post, setPost, submitHandler}: Props) {
  const [images, setImages] = useState<Array<Image>>(post.images.map(((image) => ({id: "", url: image, isLoading: false}))))

  useEffect(() => {
    setPost((prev) => ({...prev, images: images.map(image => image.url)}))
  }, [images])

  function handleRemoveImage(index) {
    setImages(images => images.filter((_, i) => i !== index));
  }

  return (
    <div className="w-full">
      <FormHeader
        mode={mode}
        title="Item"
        subtitle="Sell second-hand bulabula"
      />
      <form className="flex-center flex-col glassmorphism mt-10 gap-4 sm:gap-12" onSubmit={(e) => submitHandler(e)}>
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
                images.map((image, index) => (
                  <div key={image.id} className="relative shrink-0 flex-center w-[8rem] h-[8rem] border-2 rounded-lg">
                    {
                      image.isLoading ?
                      <LoadingCircle/>
                        :
                      <>
                        <Image src={image.url} fill={true} sizes="20vw" alt="store post image" className="object-cover rounded-md"/>
                        <Cross2Icon className="absolute right-1 top-1 p-0.5 cursor-pointer bg-gray-600 hover:bg-black rounded-full text-white" width={17} height={17} onClick={() => handleRemoveImage(index)}/>
                      </>
                    }
                  </div>
                ))
              }
            </div>
        </div>

        <InputFieldDefaultClient name="Title" value={post.title} onChangeHandler={(e) => setPost((prev) => ({...prev, title: e.target.value}))} placeholder="Title"/>
        <InputFieldPriceClient name="Price" value={post.price} onChangeHandler={(e) => setPost((prev) => ({...prev, price: e.target.value}))} placeholder="Price"/>
        <InputFieldDescriptionClient name="Description" value={post.description} onChangeHandler={(e) => setPost((prev) => ({...prev, description: e.target.value}))} placeholder="Description" />
        <div className="w-full flex-end mb-5 gap-7">
          <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
          <Button type="submit">{mode}</Button>
        </div>
      </form>
    </div>
  )
}
