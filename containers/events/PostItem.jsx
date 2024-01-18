import Link from 'next/link'
import Image from 'next/image'
import {getEventPostApi} from "@services/eventPost";

export default async function EventPostItem({id}) {
  const post = await getEventPostApi(id)
  if (!post) {
    return <></>
  }

  return (
    <Link href={`/events/${id}`}>
      <div className="group relative glass_box">
        <div className="relative w-full h-44 rounded-md bg-gray-200 group-hover:opacity-75 overflow-hidden">
          <Image
            src={post.image}
            layout="fill"
            alt="post item image"
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
