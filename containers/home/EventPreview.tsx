import EventPostItem from "@containers/events/EventPostItem";
import Link from 'next/link'
import getEventPostIdsAction from "@actions/event/getEventPostIdsAction";
import getEventPostAction from "@actions/event/getEventPostAction";
import {IEventPost} from "@models/collections/eventPost";

export default async function EventPreview() {
  const eventPostIds = await getEventPostIdsAction(1) as Array<string>
  console.log(eventPostIds)
  if (!eventPostIds) return <></>

  const eventPosts = []
  for (const id of eventPostIds) {
    eventPosts.push(await getEventPostAction(id) as IEventPost)
  }


  return (
    <section className="w-full flex-col px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <Link href="/events">
        <div className="flex flex-col border-s-4 cursor-pointer">
          <p className={`mx-4 font-satoshi text-xl font-bold text-gray-900 hover_text_blue`}>Events</p>
        </div>
      </Link>

      <div className="grid_preview_image">
        {
          eventPosts.slice(0, 4).map((post) => (
            <EventPostItem key={post.id} post={post}/>
          ))
        }
      </div>
    </section>
  )
}
