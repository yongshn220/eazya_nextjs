import HomeHeader from "@components/headers/HomeHeader";
import StorePosts from "@containers/store/StorePosts";
import NavTabSelector from "@components/nav/NavTabSelector";
import {NavTab} from "@components/constants/enums";

export default function Store() {
  return (
    <section className="w-full">
      <NavTabSelector tab={NavTab.STORE}/>
      <HomeHeader
        title="Buy & Sell"
        subtitle="Sell what you don't use anymore and buy what you need!"
        buttonName="Item"
        createRoute="create-store-post"
      />
      <div className="w-full mt-10">
        <StorePosts/>
      </div>
    </section>
  )
}
