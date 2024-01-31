import EventPost from "@containers/events/id/EventPost";
import {IEventPost} from "@models/collections/eventPost";
import getEventPostAction from "@actions/event/getEventPostAction";
import {Metadata, ResolvingMetadata} from "@node_modules/next";


export async function generateMetadata({ params }, parent: ResolvingMetadata): Promise<Metadata> {
  const postId = params.id
  const post: IEventPost  = await getEventPostAction(postId)
  if (!post) return {}

  const baseTitle = "University Events - ";
  const baseDescription = "Find out more about university events: ";

  return {
    title: baseTitle + post.title,
    description: baseDescription + post.description,
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
