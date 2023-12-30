import ContentHeader from "@components/contents/ContentHeader";


export default function GeneralLayout({children}) {
  return (
    <section className="w-full">
      <ContentHeader title="General" subtitle="See the upcoming events on the campus" buttonName="Post"/>
      <div className="w-full mt-10">
        {children}
      </div>
    </section>
  )
}
