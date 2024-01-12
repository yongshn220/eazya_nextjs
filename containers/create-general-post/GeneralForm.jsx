import FormHeader from "@components/headers/FormHeader";
import Link from 'next/link'
import {Button} from "@components/ui/button";
import InputFieldDefault from "@components/input/InputFieldDefault";
import InputFieldDescription from "@components/input/InputFieldDescription";

export default function GeneralForm({mode, post, setPost}) {

  return (
    <div className="w-full">
      <FormHeader
        mode={mode}
        title="General"
        subtitle="Share ..."
      />
      <form className="flex-center flex-col glassmorphism mt-10 gap-4 sm:gap-12">
        <InputFieldDefault name="Title" value={post.title} onChangeHandler={(e) => setPost({...post, title: e.target.value})} placeholder="Title"/>
        <InputFieldDescription title="Description" value={post.description} onChangeHandler={(e) => setPost({...post, description: e.target.value})} placeholder="Description"/>
        <div className="w-full flex-end mb-5 gap-7">
          <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
          <Button>{mode}</Button>
        </div>
      </form>
    </div>
  )
}
