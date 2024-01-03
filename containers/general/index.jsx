"use client"

import HomeHeader from "@components/headers/HomeHeader";
import GeneralMenu from "@containers/general/Menu";
import GeneralSearch from "@containers/general/Search";
import GeneralPosts from "@containers/general/Posts";
import {useState} from "react";
import {Menu} from "@containers/general/constants";
import PostPagination from "@components/page/PostPagination";


export default function General() {
  const [selectedMenu, setSelectedMenu] = useState(Menu.GENERAL)

  return (
    <section className="w-full">
      <HomeHeader
        title={selectedMenu}
        subtitle="See the upcoming events on the campus"
        buttonName="Post"
        createRoute="create-general-post"
      />
      <div className="w-full">
        <div className="w-full flex-col justify-center gap-20">
          <GeneralMenu type={selectedMenu} setType={setSelectedMenu}/>
          <GeneralSearch/>
          <GeneralPosts type={selectedMenu}/>
          <PostPagination/>
        </div>
      </div>
    </section>
  )
}
