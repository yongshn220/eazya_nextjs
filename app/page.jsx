import EventPreview from '@containers/home/EventPreview'
import CommunityGroupPreview from '@containers/home/CommunityGroupPreview'
import StorePreview from "@containers/home/StorePreview";
import NavTabSelector from "@components/nav/NavTabSelector";
import {NavTab} from "@components/constants/enums";
import InitialAccountSetup from "@containers/home/InitialAccountSetup";


export default async function Home() {
  return (
    <section className="w-full flex-center flex-col gap-5">
      <NavTabSelector tab={NavTab.NONE}/>
      <InitialAccountSetup/>
      <EventPreview/>
      <CommunityGroupPreview/>
      <StorePreview/>
    </section>
  )
}
