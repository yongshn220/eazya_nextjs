import HomeHeader from "@components/headers/HomeHeader";
import PostPagination from "@components/page/PostPagination";
import StorePostItem from "@containers/store/StorePostItem";
import StorePosts from "@containers/store/Posts";

export default function Store() {
  return (
    <section className="w-full">
      <HomeHeader
        title="Buy & Sell"
        subtitle="Second-hand market"
        buttonName="Item"
        createRoute="create-store-post"
      />
      <div className="w-full mt-10">
        <StorePosts/>
        <PostPagination/>
      </div>
    </section>
  )
}
