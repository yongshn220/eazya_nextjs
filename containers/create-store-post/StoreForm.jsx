import ContentFormHeader from "@components/contentHeaders/ContentFormHeader";
import Link from 'next/link'
import {Button} from "@components/ui/button";
import InputFieldDefault from "@components/input/InputFieldDefault";
import InputFieldDescription from "@components/input/InputFieldDescription";

export default function StoreForm({mode, post, setPost}) {

  function handleAddImage() {

  }

  return (
    <div className="w-full">
      <ContentFormHeader
        mode={mode}
        title="Item"
        subtitle="Sell second-hand bulabula"
      />
      <form className="flex-center flex-col glassmorphism mt-10 gap-4 sm:gap-12">
        <div className="w-full">
          <span className="font-satoshi font-semibold text-base text-gray-700">Image</span>
          <div className="w-full flex gap-6 mt-2 pb-2 overflow-x-auto">
            <div
              className="shrink-0 flex-center flex-col w-[8rem] h-[8rem] border-2 rounded-lg break-inside-avoid cursor-pointer hover:border-blue-300"
              onClick={handleAddImage}
            >
              <p className="text-gray-500">Icon</p>
              <p className="text-gray-500">1/4</p>
            </div>
            {
              [1,2,3,4,5,6, 7].map((image) => (
                <div key={image} className="shrink-0 flex-center w-[8rem] h-[8rem] border-2 rounded-lg"/>
              ))
            }
          </div>
        </div>

        <InputFieldDefault title="Title" value={post.title} onChangeHandler={(e) => setPost({...post, title: e.target.value})} placeholder="Title"/>
        <InputFieldDefault title="Price" value={post.date} onChangeHandler={(e) => setPost({...post, date: e.target.value})} placeholder="Price"/>
        <InputFieldDescription title="Description" value={post.description} onChangeHandler={(e) => setPost({...post, description: e.target.value})} placeholder="Description" />

        <div className="w-full flex-end mb-5 gap-7">
          <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
          <Button>{mode}</Button>
        </div>
      </form>
    </div>
  )
}
