import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@components/ui/carousel"
import {IStorePost} from "@models/collections/storePost";
import Image from 'next/image'
import React from "react";
import ImageFullViewSelector from "@components/image/ImageFullViewSelector";
import TextLink from "@components/util/TextLink";


export default function StoreContent({post}: {post: IStorePost}) {
  return (
    <section className="w-full flex-center flex-col gap-10 mt-4 pb-20 border-b border-gray-300">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-xs"
      >
        <CarouselContent>
          {
            post.images.map((image, index) => (
            <CarouselItem key={index}>
              <ImageFullViewSelector src={image}>
                <div className="relative glassmorphism h-[27rem]">
                  <Image
                    src={image}
                    fill
                    sizes="20vw, 20vw, 20vw"
                    className="w-full object-contain rounded-md"
                    alt="Store Item Image"
                  />
                </div>
              </ImageFullViewSelector>
              <div className="flex-center sm:hidden w-full text-sm text-gray-500">{`${index + 1} / ${post.images.length}`}</div>
            </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex-center flex-col gap-4">
        <p className="text-2xl font-bold">{post.title}</p>
        <p className="text-2xl font-bold text-gray-700">${post.price}</p>
      </div>
      <p className="whitespace-pre-wrap break-all"><TextLink>{post.description}</TextLink></p>
    </section>
  )
}
