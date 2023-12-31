import EventPost from "@containers/Events/id/EventPost";


export default async function EventPostPage({ params }) {
  const postId = params.id

  return (
    <EventPost id={postId}/>
  )
}
