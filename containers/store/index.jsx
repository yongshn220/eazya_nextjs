import ContentHomeHeader from "@components/contentHeaders/ContentHomeHeader";
import PostPagination from "@components/page/PostPagination";
import SellingPostItem from "@components/postItems/SellingPostItem";
import StorePosts from "@containers/store/Posts";

export default function Store() {
  return (
    <section className="w-full">
      <ContentHomeHeader
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
