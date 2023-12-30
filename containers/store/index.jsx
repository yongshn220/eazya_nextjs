import ContentHeader from "@components/contents/ContentHeader";
import PostPagination from "@components/page/PostPagination";
import SellingPostItem from "@components/contents/SellingPostItem";
import StorePosts from "@containers/store/Posts";

export default function Store() {
  return (
    <section className="w-full">
      <ContentHeader title="Buy & Sell" subtitle="Second-hand market" buttonName="Item"/>
      <div className="w-full mt-10">
        <StorePosts/>
        <PostPagination/>
      </div>
    </section>
  )
}
