export default function EventContent() {
  return (
    <section className="w-full flex-center flex-col gap-10 mt-10 pb-20 border-b border-gray-300">
      <div className="flex-center flex-col gap-4">
        <div className="glassmorphism w-[20rem] h-[27rem]"/>
        <p className="text-2xl font-bold">Stony Brook Football Club</p>
        <div className="flex-center flex-col">
          <p className="text-md font-semibold text-gray-700">Dec 12 12pm</p>
          <p className="text-md font-semibold text-gray-700">Tabler Center #108</p>
        </div>
      </div>

      <p className="whitespace-pre-wrap">
        "What is Lorem Ipsum??<br/><br/>

        Lorem      Ipsum is simply dummy text of the printing and typesetting industry.

        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,<br/>
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br/>
        It has survived not only five centuries,
        but also the leap into electronic typesetting, remaining essentially unchanged.<br/>

        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
    </section>
  )
}
