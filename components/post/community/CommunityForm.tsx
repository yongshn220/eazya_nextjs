import FormHeader from "@components/headers/FormHeader";
import Link from 'next/link'
import {Button} from "@components/ui/button";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue} from "@components/ui/select";
import {CommunityType} from "@components/constants/enums";
import InputFieldDefaultClient from "@components/input/InputFieldDefaultClient";
import InputFieldDescriptionClient from "@components/input/InputFieldDescriptionClient";
import {CreateCommunityRequestBase} from "@models/base/CreateCommunityRequestBase";

interface Props {
  mode: string;
  post: CreateCommunityRequestBase;
  setPost: any;
  submitHandler: Function;
}

export default function CommunityForm({mode, post, setPost, submitHandler}: Props) {

  function handleSelectChange(value) {
    setPost((prev) => ({...prev, communityType: value as CommunityType}))
  }

  return (
    <div className="w-full">
      <FormHeader
        mode={mode}
        title={post.postType}
        subtitle="Share anything you like!"
      />
      <form className="flex-center flex-col glassmorphism mt-10 gap-4 sm:gap-8" onSubmit={(e) => submitHandler(e)}>
        <div className="w-full flex-start flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Select a community
          </span>
          <Select value={post.communityType} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full py-5 mt-2 bg-white border-none shadow-none">
              <SelectValue>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                  Community
                </SelectLabel>
                <SelectSeparator/>
                {
                  Object.values(CommunityType).map((menuType) => (
                    <SelectItem
                      key={menuType}
                      value={menuType}
                    >
                      {menuType}
                    </SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <InputFieldDefaultClient name="Title" value={post.title} placeholder="Title" onChangeHandler={e => setPost(prev => ({...prev, title: e.target.value}))}/>
        <InputFieldDescriptionClient name="Description" value={post.description} placeholder="Description" onChangeHandler={(e => setPost(prev => ({...prev, description: e.target.value})))}/>
        <div className="w-full flex-end mb-5 gap-7">
          <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
          <Button type="submit">{mode}</Button>
        </div>
      </form>
    </div>
  )
}
