import EventPreview from '@containers/home/EventPreview'
import CommunityGroupPreview from '@containers/home/CommunityGroupPreview'
import StorePreview from "@containers/home/StorePreview";
import NavTabSelector from "@components/nav/NavTabSelector";
import {NavTab} from "@components/constants/enums";


export default function Home() {
  return (
    <section className="w-full flex-center flex-col gap-20">
      <NavTabSelector tab={NavTab.NONE}/>
      <EventPreview/>
      <CommunityGroupPreview/>
      <StorePreview/>
    </section>
  )
}
