import Image from 'next/image'
import EventPostItem from "@components/contents/EventPostItem";

export default function EventHome() {
  return (
    <section className="w-full flex-col gap-20">
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
    </section>
  )
}
