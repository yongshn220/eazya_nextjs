import getEventPostIdsAction from "@actions/event/getEventPostIdsAction";
import EventPostLoadMore from "@containers/events/EventPostLoadMore";
import getEventPostAction from "@actions/event/getEventPostAction";
import {IEventPost} from "@models/collections/eventPost";
import EventDetailPostItem from "@containers/events/EventDetailPostItem";


export default async function EventPosts() {
  const postIds = await getEventPostIdsAction(1)
  if (!postIds) return <></>

  const posts = []
  for (const id of postIds) {
    const post = await getEventPostAction(id) as IEventPost
    if (!post) continue

    posts.push(post)
  }


  return (
    <section>
      <div className="grid_image">
        {
          posts.map(post => (
            <EventDetailPostItem key={post.id} post={post}/>
          ))
        }
      </div>
      <EventPostLoadMore/>
    </section>
  )
}
