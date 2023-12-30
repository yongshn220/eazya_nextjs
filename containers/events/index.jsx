import ContentHeader from "@components/contents/ContentHeader";
import EventPosts from "@containers/events/Posts";
import PostPagination from "@components/page/PostPagination";

export default function Events() {
  return (
    <section className="w-full">
      <ContentHeader title="Events" subtitle="See the upcoming events on the campus" buttonName="Event"/>
      <div className="w-full mt-10">
        <EventPosts/>
        <PostPagination/>
      </div>
    </section>
  )
}
