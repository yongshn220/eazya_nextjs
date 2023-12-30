import Image from 'next/image'
import EventPostBox from "@components/contentItems/EventPostBox";

export default function EventHome() {
  return (
    <section className="w-full flex-col gap-20">
      <div className="grid_image">
        <EventPostBox/>
        <EventPostBox/>
        <EventPostBox/>
        <EventPostBox/>
        <EventPostBox/>
        <EventPostBox/>
        <EventPostBox/>
        <EventPostBox/>
        <EventPostBox/>
        <EventPostBox/>
      </div>
    </section>
  )
}
