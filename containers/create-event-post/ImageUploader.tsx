"use client"

import ImageContainer from "@containers/create-event-post/ImageContainer";
import SingleImageUploader from "@components/image/SingleImageUploader";
import {useState} from "react";


export default function ImageUploader() {
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState("")

  return (
    <SingleImageUploader setImage={setImage} disabled={false} setIsLoading={setIsLoading}>
      <ImageContainer image={image} handleRemove={() => setImage("")} isLoading={isLoading}/>
    </SingleImageUploader>
  )
}
