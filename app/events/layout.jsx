import ContentHeader from "@components/contents/ContentHeader";


export default function EventLayout({children}) {
  return (
    <section className="w-full">
      <ContentHeader title="Events" subtitle="See the upcoming events on the campus" buttonName="Event"/>
      <div className="w-full mt-10">
        {children}
      </div>
    </section>
  )
}
