import ContentFormHeader from "@components/contents/ContentFormHeader";
import Image from 'next/image'
import Link from 'next/link'
import {Button} from "@components/ui/button";

export default function EventForm({mode, post, setPost}) {

  function handleAddImage() {

  }

  return (
    <div className="w-full">
      <ContentFormHeader
        mode={mode}
        title="Event"
        subtitle="Share the upcoming event on the campus"
      />
      <form className="glass_box mt-10 gap-7">
        <div className="w-full flex flex-between h-80">
          <div className="w-full h-full flex flex-col mr-10 gap-7">
            <label className="w-full">
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Title
              </span>
              <input
                value={post.tag}
                onChange={(e) => setPost({...post, title: e.target.value})}
                placeholder="Title"
                required
                className="form_input"
              >
              </input>
            </label>
            <label className="w-full mr-10">
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Title
              </span>
              <input
                value={post.tag}
                onChange={(e) => setPost({...post, title: e.target.value})}
                placeholder="Title"
                required
                className="form_input"
              >
              </input>
            </label>
            <label className="w-full">
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Title
              </span>
              <input
                value={post.tag}
                onChange={(e) => setPost({...post, title: e.target.value})}
                placeholder="Title"
                required
                className="form_input"
              >
              </input>
            </label>
          </div>

          <div
            className="flex-center w-80 h-80 border border-dashed rounded-lg break-inside-avoid cursor-pointer group"
            onClick={handleAddImage}
          >
            <p className="text-gray-500 group-hover:text-blue-500">Add Image</p>
            {/*<Image*/}
            {/*  src="/assets/images/sampleImage.png"*/}
            {/*  alt="Front of men's Basic Tee in black."*/}
            {/*  width={200}*/}
            {/*  height={400}*/}
            {/*  objectFit="contain"*/}
            {/*  className="absolute"*/}
            {/*/>*/}
          </div>
        </div>
        <label className="w-full p-2">
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

        <div className="w-full flex-end mx-3 mb-5 gap-7">
          <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
          <Button>{mode}</Button>
        </div>
      </form>
    </div>
  )
}
