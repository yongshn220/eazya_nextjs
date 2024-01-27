import EventPostItem from "@containers/events/EventPostItem";
import Link from 'next/link'
import getEventPostIdsAction from "@actions/event/getEventPostIdsAction";
import getEventPostAction from "@actions/event/getEventPostAction";
import {IEventPost} from "@models/collections/eventPost";
import {getHomePath} from "@components/constants/tags";
import {PostType} from "@components/constants/enums";
import Image from "@node_modules/next/image";

export default async function EventPreview() {
  const eventPostIds = await getEventPostIdsAction(1) as Array<string>
  if (!eventPostIds) return <></>

  const eventPosts = []
  for (const id of eventPostIds) {
    const post = await getEventPostAction(id) as IEventPost
    if (post) {
      eventPosts.push(post)
    }
  }


  return (
    <section className="w-full flex-col px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <Link href={getHomePath(PostType.EVENT)}>
        {/*<div className="flex flex-col border-s-4 cursor-pointer">*/}
        {/*  <p className={`mx-4 font-satoshi text-xl font-bold text-gray-900 hover_text_blue`}>Events</p>*/}
        {/*</div>*/}
        <div className="relative p-2 h-8 rounded-lg flex-center cursor-pointer group">
          <Image
            src={"/assets/images/title_background.png"}
            fill
            sizes="100vw"
            className="w-full object-cover rounded-md opacity-600"
            alt="1"
          />
          <p className={`absolute text-lg font-semibold hover_text_blue`}>Events</p>
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
