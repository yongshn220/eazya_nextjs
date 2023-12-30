import SellingPostItem from "@components/contents/SellingPostItem";

export default function StorePreview() {
  return (
    <section className="w-full flex-col px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="flex flex-col border-s-4">
        <h1 className="mx-4 font-satoshi text-xl font-bold text-gray-900 ">Store</h1>
        {/*<p className="mx-4 font-satoshi text-md text-gray-900">See the upcoming events on campus</p>*/}
      </div>

      <div className="grid_image">
        <SellingPostItem/>
        <SellingPostItem/>
        <SellingPostItem/>
        <SellingPostItem/>
      </div>
    </section>
  )
}
