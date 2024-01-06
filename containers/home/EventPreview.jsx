import PostItem from "@containers/events/PostItem";
import Link from 'next/link'
import {hoveredTextColor} from "@components/constants/values";

export default function EventPreview() {
  return (
    <section className="w-full flex-col px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <Link href="/events">
        <div className="flex flex-col border-s-4 cursor-pointer">
          <h1 className={`mx-4 font-satoshi text-xl font-bold text-gray-900 hover:${hoveredTextColor}`}>Events</h1>
        </div>
      </Link>

      <div className="grid_image">
        {/*<PostItem/>*/}
        {/*<PostItem/>*/}
        {/*<PostItem/>*/}
        {/*<PostItem/>*/}
      </div>
    </section>
  )
}
