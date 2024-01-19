import StorePost from "@containers/store/id/StorePost";

export default function StorePostPage({ params }) {
  const postId = params.id

  return (
    <StorePost id={postId}/>
  )
}
