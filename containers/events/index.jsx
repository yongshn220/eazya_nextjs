import HomeHeader from "@components/headers/HomeHeader";
import EventPosts from "@containers/events/EventPosts";
import PostPagination from "@components/page/PostPagination";
import NavTabSelector from "@components/nav/NavTabSelector";
import {NavTab} from "@components/constants/enums";


export default function Events() {
  return (
    <section className="w-full">
      <NavTabSelector tab={NavTab.EVENT}/>
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
