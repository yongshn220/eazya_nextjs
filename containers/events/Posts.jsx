import PostItem from "@containers/events/PostItem";
import useEventPostIds from "@containers/events/useEventPostIds";

export default function EventPosts() {
  const {page, setPage, data: eventPostIds, isLoading } = useEventPostIds()

  return (
    <div className="grid_image">
      {
        eventPostIds.map(id => (
          <PostItem id={id}/>
        ))
      }
    </div>
  )
}
