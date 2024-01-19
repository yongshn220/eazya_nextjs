import FormHeader from "@components/headers/FormHeader";
import Link from 'next/link'
import {Button} from "@components/ui/button";
import InputFieldDefault from "@components/input/InputFieldDefault";
import {hoveredTextColor} from "@components/constants/values";
import InputFieldDescription from "@components/input/InputFieldDescription";
import ImageUploader from "@containers/create-event-post/ImageUploader";

export default function EventForm({mode, handleSubmit}) {
  // TODO: handle mobile viewport
  return (
    <div className="w-full">
      <FormHeader
        mode={mode}
        title="Event"
        subtitle="Share the upcoming event on the campus"
      />
      <form className="flex-center flex-col glassmorphism mt-10 gap-4 sm:gap-12" action={handleSubmit}>
        <div
          className="flex-center sm:hidden w-[10rem] h-[10rem] mt-7 border border-dashed rounded-lg break-inside-avoid cursor-pointer group"
        >
          Add Image
        </div>
        <div className="w-full flex flex-row sm:h-[24rem] ">
          <div className="w-full flex-between flex-col sm:mr-10 gap-4 sm:gap-0">
            <InputFieldDefault name="Title" value={""} placeholder="Title"/>
            <InputFieldDefault name="Date" value={""} placeholder="Date"/>
            <InputFieldDefault name="Time" value={""} placeholder="Time"/>
            <InputFieldDefault name="Location" value={""} placeholder="Location"/>
          </div>
          <div className="flex flex-col h-full gap-3">
            <span className="hidden sm:flex font-satoshi font-semibold text-base text-gray-700">Image</span>
            <ImageUploader/>
          </div>

        </div>
        <InputFieldDescription name="Description" value={""} placeholder="Description"/>
        <div className="w-full flex-end mb-5 gap-7">
          <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
          <Button type="submit">{mode}</Button>
        </div>
      </form>
    </div>
  )
}
