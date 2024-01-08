import Link from 'next/link'
import useEventPost from "@containers/events/useEventPost";
import LoadingCircle from "@components/animation/LoadingCircle";
import Image from 'next/image'

export default function EventPostItem({id}) {
  const {post, isLoading} = useEventPost(id)

  if (isLoading) {
    return (<LoadingCircle/>)
  }

  if (!post) {
    return <></>
  }

  console.log(post.image)

  return (
    <Link href={`/events/${id}`}>
      <div className="group relative glass_box">
        <div
          className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-50">
          <Image
            src={post.image}
            width={10}
            height={10}
            alt="Front of men&#039;s Basic Tee in black."
          />
        </div>
        <div className="w-full mt-4 flex flex-col gap-3">
          <h3 className="text-md font-bold text-gray-900 line-clamp-1">{post.title}</h3>
          <div className="flex flex-col gap-1 text-sm text-gray-700">
            <p className="line-clamp-1">
              {post.date}
            </p>
            <p className="line-clamp-1">
              {post.location}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
