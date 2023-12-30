import EventPreview from '@containers/home/EventPreview'
import CommunityGroupPreview from '@containers/home/CommunityGroupPreview'
import StorePreview from "@containers/home/StorePreview";


export default function Home() {
  return (
    <section className="w-full flex-center flex-col gap-20">
      <EventPreview/>
      <CommunityGroupPreview/>
      <StorePreview/>
    </section>
  )
}
