import EventPostItem from "@containers/events/EventPostItem";
import getEventPostIdsAction from "@actions/event/getEventPostIdsAction";
import EventPostLoadMore from "@containers/events/EventPostLoadMore";
import getEventPostAction from "@actions/event/getEventPostAction";
import {IEventPost} from "@models/collections/eventPost";


export default async function EventPosts() {
  const postIds = await getEventPostIdsAction(1)
  if (!postIds) return <></>

  const posts = []
  for (const id of postIds) {
    posts.push(await getEventPostAction(id) as IEventPost)
  }


  return (
    <section>
      <div className="grid_image">
        {
          posts.map(post => (
            <EventPostItem key={post.id} post={post}/>
          ))
        }
      </div>
      <EventPostLoadMore/>
    </section>
  )
}
