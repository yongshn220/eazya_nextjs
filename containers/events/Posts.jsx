import EventPostItem from "@components/postItems/EventPostItem";
import useEventPosts from "@containers/events/useEventPosts";

export default function EventPosts() {
  const {page, setPage, data: eventPosts, isLoading } = useEventPosts()

  return (
    <div className="grid_image">
      <EventPostItem/>
      <EventPostItem/>
      <EventPostItem/>
      <EventPostItem/>
      <EventPostItem/>
      <EventPostItem/>
      <EventPostItem/>
      <EventPostItem/>
      <EventPostItem/>
      <EventPostItem/>
    </div>
  )
}
