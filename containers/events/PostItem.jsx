import Link from 'next/link'
import useEventPost from "@containers/events/useEventPost";

export default function EventPostItem({id}) {
  // const {eventPost, isLoading} = useEventPost(id)

  return (
    <Link href={`/events/${id}`}>
      <div className="group relative glass_box">
        <div
          className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-50">
          <img
            src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
            alt="Front of men&#039;s Basic Tee in black."
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="w-full mt-4 flex flex-col gap-3">
          <h3 className="text-md font-bold text-gray-900 line-clamp-1">Event Title</h3>
          <div className="flex flex-col gap-1 text-sm text-gray-700">
            <p className="line-clamp-1">
              Dec 12, 12pm
            </p>
            <p className="line-clamp-1">
              Tabler Center #108
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
