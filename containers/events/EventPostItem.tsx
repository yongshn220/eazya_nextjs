import Link from 'next/link'
import Image from 'next/image'

export default function EventPostItem({post}) {
  if (!post) {
    return <></>
  }

  return (
    <Link href={`/events/${post.id}`}>
      <div className="group relative glass_box">
        <div className="relative w-full bg-gray-200 group-hover:opacity-75">
          <Image
            src={post.image}
            alt="post item image"
            width={0}
            height={0}
            sizes="50vw, 25vw, 25vw"
            className="w-full aspect-[3/4] object-cover rounded-md"
          />
        </div>
        <div className="w-full mt-4 flex flex-col gap-3">
          <h3 className="text-md font-bold text-gray-900 line-clamp-1">{post.title}</h3>
          <div className="flex flex-col gap-1 text-sm text-gray-700">
            <p className="line-clamp-1">
              {post.date}
            </p>
            {/*<p className="line-clamp-1">*/}
            {/*  {post.location}*/}
            {/*</p>*/}
          </div>
        </div>
      </div>
    </Link>
  )
}
