import FormHeader from "@components/headers/FormHeader";
import Image from 'next/image'
import Link from 'next/link'
import {Button} from "@components/ui/button";
import InputFieldDefault from "@components/input/InputFieldDefault";
import {hoveredTextColor} from "@components/constants/values";

export default function EventForm({mode, post, setPost}) {

  function handleAddImage() {

  }

  return (
    <div className="w-full">
      <FormHeader
        mode={mode}
        title="Event"
        subtitle="Share the upcoming event on the campus"
      />
      <form className="flex-center flex-col glassmorphism mt-10 gap-4 sm:gap-12">
        <div
          className="flex-center sm:hidden w-[10rem] h-[10rem] mt-7 border border-dashed rounded-lg break-inside-avoid cursor-pointer group"
          onClick={handleAddImage}
        >
          <p className={`text-gray-500 group-hover:${hoveredTextColor}`}>Add Image</p>
        </div>
        <div className="w-full flex flex-row sm:h-80 ">
          <div className="w-full flex-between flex-col sm:mr-10 gap-4 sm:gap-0">
            <InputFieldDefault title="Title" value={post.title} onChangeHandler={(e) => setPost({...post, title: e.target.value})} placeholder="Title"/>
            <InputFieldDefault title="Date" value={post.date} onChangeHandler={(e) => setPost({...post, date: e.target.value})} placeholder="Date"/>
            <InputFieldDefault title="Location" value={post.location} onChangeHandler={(e) => setPost({...post, location: e.target.value})} placeholder="Location"/>
          </div>
          <div
            className="hidden sm:flex justify-center items-center w-[20rem] mt-7 border border-dashed rounded-lg break-inside-avoid cursor-pointer group"
            onClick={handleAddImage}
          >
            <p className={`text-gray-500 group-hover:${hoveredTextColor}`}>Add Image</p>
          </div>
        </div>
        <label className="w-full ">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Description
          </span>
          <textarea
            value={post.title}
            onChange={(e) => setPost({...post, description: e.target.value})}
            placeholder="Title"
            required
            className="form_textarea"
          >
          </textarea>
        </label>

        <div className="w-full flex-end mb-5 gap-7">
          <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
          <Button>{mode}</Button>
        </div>
      </form>
    </div>
  )
}
