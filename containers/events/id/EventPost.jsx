import Post from "@components/post/Post";
import {PostType} from "@components/constants/enums";
import useEventPost from "@containers/events/useEventPost";
import LoadingCircle from "@components/animation/LoadingCircle";

export default function EventPost({id}) {
  const {eventPost, isLoading} = useEventPost(id)

  if (isLoading) {
    return (<LoadingCircle/>)
  }

  return (
    <Post type={PostType.EVENT} post={eventPost}/>
  )
}
