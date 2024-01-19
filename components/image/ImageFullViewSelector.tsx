"use client"

import {useState} from "react";
import Image from 'next/image'


export default function ImageFullViewer() {
  const [image, setImage] = useState<string>(null)

  return (
    <div>
      {
        image &&
        <div
          className="absolute z-[9999] top-0 left-0 w-screen h-screen"
          onClick={() => setImage(null)}
        >
          <Image
            src={image}
            fill
            sizes="100vw"
            alt="full view image"
            className="w-full h-full object-contain"
          />
        </div>
      }
    </div>
  )
}
