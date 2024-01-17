import PostItem from "@containers/events/PostItem";
import Link from 'next/link'
import {hoveredTextColor} from "@components/constants/values";
import {getEventPostIdsApi} from "@services/eventPost";

export default async function EventPreview() {
  const eventPostIds = await getEventPostIdsApi(1)

  return (
    <section className="w-full flex-col px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <Link href="/events">
        <div className="flex flex-col border-s-4 cursor-pointer">
          <p className={`mx-4 font-satoshi text-xl font-bold text-gray-900 hover:${hoveredTextColor}`}>Events</p>
        </div>
      </Link>

      <div className="grid_image">
        {
          eventPostIds.slice(0, 5).map((id) => (
            <PostItem key={id} id={id}/>
          ))
        }
      </div>
    </section>
  )
}
