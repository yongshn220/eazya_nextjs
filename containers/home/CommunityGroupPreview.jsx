import GeneralPreview from "@containers/home/GeneralPreview";
import FindMemberPreview from "@containers/home/FindMemberPreview";

export default async function CommunityGroupPreview() {
  return (
    <section className="w-full flex-col px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      {/*<div className="flex flex-col border-s-4">*/}
      {/*  <p className="mx-4 font-satoshi text-xl font-bold text-gray-900 ">Community</p>*/}
      {/*</div>*/}

      <div className="grid_12">
        <GeneralPreview/>
        <FindMemberPreview/>
      </div>
    </section>
  )
}
