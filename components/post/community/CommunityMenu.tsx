"use client"

import {Button} from "@components/ui/button";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {CommunityType, PostType, PostTypeURL} from "@components/constants/enums";
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {getCommunityHomePath} from "@components/constants/tags";


interface Props {
  postType: PostType;
  communityType: CommunityType;
}

export default function CommunityMenu({postType, communityType}: Props) {
  const router = useRouter()

  return (
    <div>
      {/* desktop view */}
      <div className="hidden md:flex justify-center bg-white border-b">
        {
          Object.values(CommunityType).map((menuType) => (
            <Link key={menuType} href={getCommunityHomePath(postType, menuType)}>
              <Button variant="ghost"
                key={menuType}
                className={communityType === menuType ? 'default_blue_text' : ''}
              >
                {menuType}
              </Button>
            </Link>
          ))
        }
      </div>

      {/* mobile view */}
      <div className="flex-center md:hidden mt-5">
        <Select defaultValue={communityType} onValueChange={(value: CommunityType) => router.push(getCommunityHomePath(postType, value))}>
          <SelectTrigger className="w-[320px]">
            <SelectValue placeholder="Select a community" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {
                Object.values(CommunityType).map((menuType) => (
                  <SelectItem value={menuType} key={menuType}>
                    {menuType}
                  </SelectItem>
                ))
              }
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
