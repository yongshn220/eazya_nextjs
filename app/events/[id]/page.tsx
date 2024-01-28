import EventPost from "@containers/events/id/EventPost";
import {IEventPost} from "@models/collections/eventPost";
import getEventPostAction from "@actions/event/getEventPostAction";
import {Metadata, ResolvingMetadata} from "@node_modules/next";


export async function generateMetadata({ params }, parent: ResolvingMetadata): Promise<Metadata> {
  const postId = params.id
  const post: IEventPost  = await getEventPostAction(postId)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
  }
}

export default async function EventPostPage({ params }) {
  const postId = params.id

  const post: IEventPost  = await getEventPostAction(postId)
  if (!post) return <></>

  return (
    <EventPost post={post}/>
  )
}
