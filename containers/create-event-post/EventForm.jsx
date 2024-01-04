import FormHeader from "@components/headers/FormHeader";
import Image from 'next/image'
import Link from 'next/link'
import {Button} from "@components/ui/button";
import InputFieldDefault from "@components/input/InputFieldDefault";
import {hoveredTextColor} from "@components/constants/values";
import InputFieldDescription from "@components/input/InputFieldDescription";
import SingleImageUploader from "@components/image/SingleImageUploader";


export default function EventForm({mode, post, setPost}) {

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
        >
          <p className={`text-gray-500 group-hover:${hoveredTextColor}`}>Add Image</p>
        </div>
        <div className="w-full flex flex-row sm:h-[24rem] ">
          <div className="w-full flex-between flex-col sm:mr-10 gap-4 sm:gap-0">
            <InputFieldDefault title="Title" value={post.title} onChangeHandler={(e) => setPost({...post, title: e.target.value})} placeholder="Title"/>
            <InputFieldDefault title="Date" value={post.date} onChangeHandler={(e) => setPost({...post, date: e.target.value})} placeholder="Date"/>
            <InputFieldDefault title="Time" value={post.time} onChangeHandler={(e) => setPost({...post, time: e.target.value})} placeholder="Time"/>
            <InputFieldDefault title="Location" value={post.location} onChangeHandler={(e) => setPost({...post, location: e.target.value})} placeholder="Location"/>
          </div>
          {
            post.image &&
            <Image
              src={post.image}
              width={100}
              height={100}
            />
          }
          <SingleImageUploader onLoadEnd={(result) => setPost({...post, image: result})}>
            <div className="hidden sm:flex justify-center items-center w-[18rem] h-full mt-7 border border-dashed hover:border-blue-300 rounded-lg cursor-pointer group">
              <p className={`text-gray-500 group-hover:${hoveredTextColor}`}>Add Image</p>
            </div>
          </SingleImageUploader>
        </div>
        <InputFieldDescription title="Description" value={post.description}
                               onChangeHandler={(e) => setPost({...post, description: e.target.value})}
                               placeholder="Description"/>
        <div className="w-full flex-end mb-5 gap-7">
          <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
          <Button>{mode}</Button>
        </div>
      </form>
    </div>
  )
}
