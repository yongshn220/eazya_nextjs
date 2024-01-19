import GeneralPost from "@containers/general/id/GeneralPost";

export default function GeneralPostPage({ params }) {
  const type = params.type
  const postId = params.id

  return (
    <GeneralPost id={postId} type={type}/>
  )
}
