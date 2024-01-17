import FormHeader from "@components/headers/FormHeader";
import Link from 'next/link'
import {Button} from "@components/ui/button";
import InputFieldDefault from "@components/input/InputFieldDefault";
import InputFieldDescription from "@components/input/InputFieldDescription";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel, SelectSeparator,
  SelectTrigger,
  SelectValue
} from "@components/ui/select";
import {GeneralMenuType, GeneralCommunityType} from "@components/constants/enums";
import React, {useState} from "react";
import InputFieldDefaultClient from "@components/input/InputFieldDefaultClient";
import InputFieldDescriptionClient from "@components/input/InputFieldDescriptionClient";
import {CreateGeneralPostRequest} from "@models/requests/CreateGeneralPostRequest";

interface Props {
  mode: string;
  post: CreateGeneralPostRequest;
  setPost: any;
  submitHandler: Function;
}

export default function GeneralForm({mode, post, setPost, submitHandler}: Props) {

  return (
    <div className="w-full">
      <FormHeader
        mode={mode}
        title="General"
        subtitle="Share anything you like!"
      />
      <form className="flex-center flex-col glassmorphism mt-10 gap-4 sm:gap-8" onSubmit={() => submitHandler()}>
        <div className="w-full flex-start flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Select a community
          </span>
          <Select value={post.communityType} onValueChange={(value: string) => setPost((prev) => ({...prev, communityType: GeneralCommunityType[value]}))}>
            <SelectTrigger className="w-full py-5 mt-2 bg-white border-none shadow-none">
              <SelectValue>
                {post.communityType}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                  Community
                </SelectLabel>
                <SelectSeparator/>
                {
                  Object.values(GeneralCommunityType).map((menuType) => (
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

        <InputFieldDefaultClient name="Title" value={post.title} placeholder="Title" onChangeHandler={value => setPost(prev => ({...prev, title: value}))}/>
        <InputFieldDescriptionClient name="Description" value={post.description} placeholder="Description" onChangeHandler={(value => setPost(prev => ({...prev, description: value})))}/>
        <div className="w-full flex-end mb-5 gap-7">
          <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
          <Button type="submit">{mode}</Button>
        </div>
      </form>
    </div>
  )
}
