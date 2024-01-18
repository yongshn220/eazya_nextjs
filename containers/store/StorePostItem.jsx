import Link from 'next/link'
import getStorePostAction from "@actions/store/getStorePostAction";
import Image from 'next/image'

export default async function StorePostItem({id}) {
  const post = await getStorePostAction(id)
  if (!post) {
    return <></>
  }

  return (
    <Link href={`/store/${id}`}>
      <div className="group relative glass_box">
        <div className="relative w-full bg-gray-200 group-hover:opacity-75">
          <Image
            src={post.images[0]}
            alt="store first image"
            width={0}
            height={0}
            sizes="100vw"
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
