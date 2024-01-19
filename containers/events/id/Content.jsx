import Image from 'next/image'

export default function EventContent({post}) {
  return (
    <section className="w-full flex-center flex-col gap-10 mt-4 pb-20 border-b border-gray-300">
      <div className="flex-center flex-col gap-4">
        <div className="relative glassmorphism w-[20rem] h-[27rem]">
          <Image
            src={post.image}
            fill={true}
            sizes="50vw, 25vw, 25vw"
            alt="Event Post Image"
          />
        </div>
        <p className="text-2xl font-bold">{post.title}</p>
        <div className="flex-center flex-col">
          <p className="text-md font-semibold text-gray-700">{post.date}</p>
          <p className="text-md font-semibold text-gray-700">{post.location}</p>
        </div>
      </div>
      <p className="whitespace-pre-wrap">{post.description}</p>
    </section>
  )
}
