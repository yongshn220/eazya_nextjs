import EventPostItem from "@containers/events/EventPostItem";
import getEventPostIdsAction from "@actions/event/getEventPostIdsAction";
import EventPostLoadMore from "@containers/events/EventPostLoadMore";
import getEventPostAction from "@actions/event/getEventPostAction";
import {IEventPost} from "@models/collections/eventPost";


export default async function EventPosts() {
  const eventPostIds = await getEventPostIdsAction(1)
  const eventPosts = []
  for (const id of eventPostIds) {
    eventPosts.push(await getEventPostAction(id) as IEventPost)
  }


  return (
    <section>
      <div className="grid_image">
        {
          eventPosts.map(post => (
            <EventPostItem key={post.id} post={post}/>
          ))
        }
      </div>
      <EventPostLoadMore/>
    </section>
  )
}
