import StorePostItem from "@containers/store/StorePostItem";
import Link from 'next/link'
import {hoveredTextColor} from "@components/constants/values";

export default function StorePreview() {
  return (
    <section className="w-full flex-col px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <Link href="/store">
        <div className="flex flex-col border-s-4 group cursor-pointer">
          <h1 className={`mx-4 font-satoshi text-xl font-bold text-gray-900 group-hover:${hoveredTextColor}`}>Buy & Sell</h1>
          <p className="mx-4 font-satoshi text-md text-gray-500">Second-hand market</p>
        </div>
      </Link>

      <div className="grid_image">
        <StorePostItem/>
        <StorePostItem/>
        <StorePostItem/>
        <StorePostItem/>
      </div>
    </section>
  )
}
