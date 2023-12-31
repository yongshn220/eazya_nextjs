import HomeHeader from "@components/headers/HomeHeader";
import EventPosts from "@containers/events/Posts";
import PostPagination from "@components/page/PostPagination";

export default function Events() {
  return (
    <section className="w-full">
      <HomeHeader
        title="Events"
        subtitle="See the upcoming events on the campus"
        buttonName="Event"
        createRoute="create-event-post"
      />
      <div className="w-full mt-10">
        <EventPosts/>
        <PostPagination/>
      </div>
    </section>
  )
}
