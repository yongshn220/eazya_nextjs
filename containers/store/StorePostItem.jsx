import Link from 'next/link'
import Image from 'next/image'
import {getPostPath} from "@components/constants/tags";
import {PostType} from "@components/constants/enums";


export default function StorePostItem({post}) {
  if (!post) return <></>

  return (
    <Link href={getPostPath(post.id, PostType.STORE)}>
      <div className="group relative glass_box">
        <div className="relative w-full bg-gray-200 group-hover:opacity-75">
          <Image
            src={post.images[0]}
            alt="store first image"
            width={0}
            height={0}
            sizes="50vw, 25vw, 25vw"
            className="w-full aspect-[3/4] object-cover rounded-md"
          />
        </div>
        <div className="w-full mt-4 flex-start flex-col gap-1">
          <h3 className="text-sm text-gray-700 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm font-medium text-gray-900">${post.price}</p>
        </div>
      </div>
    </Link>
  )
}
