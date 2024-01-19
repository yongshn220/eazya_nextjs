import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@components/ui/carousel"
import {IStorePost} from "@models/collections/storePost";
import Image from 'next/image'
import ImageFullViewer from "@components/image/ImageFullViewer";
import ImageFullViewSelector from "@components/image/ImageFullViewer";

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
                    sizes="100vw, 50vw, 25vw"
                    className="w-full object-contain rounded-md"
                    alt="Store Item Image"
                  />
                </div>
              </ImageFullViewSelector>
            </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex-center flex-col gap-4">
        <p className="text-2xl font-bold">Stony Brook Football Club</p>
        <p className="text-2xl font-bold text-gray-700">$12</p>
      </div>

      <p className="whitespace-pre-wrap">
        "What is Lorem Ipsum??<br/><br/>

        Lorem      Ipsum is simply dummy text of the printing and typesetting industry.

        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,<br/>
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br/>
        It has survived not only five centuries,
        but also the leap into electronic typesetting, remaining essentially unchanged.<br/>

        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
    </section>
  )
}
