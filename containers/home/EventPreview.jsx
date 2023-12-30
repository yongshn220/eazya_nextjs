import EventPostItem from "@components/contents/EventPostItem";
import Link from 'next/link'

export default function EventPreview() {
  return (
    <section className="w-full flex-col px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <Link href="/events">
        <div className="flex flex-col border-s-4 cursor-pointer">
          <h1 className="mx-4 font-satoshi text-xl font-bold text-gray-900 hover:text-blue-500">Events</h1>
        </div>
      </Link>

      <div className="grid_image">
        <EventPostItem/>
        <EventPostItem/>
        <EventPostItem/>
        <EventPostItem/>
      </div>
    </section>
  )
}
