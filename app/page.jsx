import EventPreview from '@components/previews/EventPreview'
import CommunityGroupPreview from '@components/previews/CommunityGroupPreview'


export default function Home() {
  return (
    <section className="w-full flex-center flex-col gap-20">
      <EventPreview/>
      <CommunityGroupPreview/>
    </section>
  )
}
