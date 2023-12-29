import ImagePost from "@components/contentItems/ImagePost";

export default function EventPreview() {
  return (
    <section className="w-full flex-col px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="flex flex-col border-s-4">
        <h1 className="mx-4 font-satoshi text-xl font-bold text-gray-900 ">Events</h1>
        {/*<p className="mx-4 font-satoshi text-md text-gray-900">See the upcoming events on campus</p>*/}
      </div>

      <div className="grid_2358">
        <ImagePost/>
        <ImagePost/>
        <ImagePost/>
        <ImagePost/>
        <ImagePost/>
      </div>
    </section>
  )
}
