import Link from 'next/link'
import Image from 'next/image'

export default function EventPostItem({post}) {
  if (!post) {
    return <></>
  }

  return (
    <Link href={`/events/${post.id}`}>
      <div className="group relative glass_box_thin">
        <div className="relative w-full group-hover:opacity-75">
          <Image
            src={(post.image)? post.image : "/assets/images/no_image_post_1.png"}
            alt="post item image"
            width={0}
            height={0}
            sizes="50vw, 25vw, 25vw"
            className="w-full aspect-[3/4] object-cover rounded-md"
          />
        </div>
        <div className="w-full mt-4 flex flex-col gap-3">
          <h3 className="text-xs text-gray-900 line-clamp-1">{post.title}</h3>
        </div>
      </div>
    </Link>
  )
}
