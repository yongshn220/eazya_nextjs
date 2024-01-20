import EventPost from "@containers/events/id/EventPost";


export default async function EventPostPage({ params }) {
  const postId = params.id

  return (
    <EventPost postId={postId}/>
  )
}
