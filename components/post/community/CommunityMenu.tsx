import {Button} from "@components/ui/button";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {CommunityType, PostType, PostTypeURL} from "@components/constants/enums";
import {hoveredTextColor} from "@components/constants/values";
import Link from 'next/link'


interface Props {
  postType: PostType;
  communityType: CommunityType;
}

export default function CommunityMenu({postType, communityType}: Props) {
  return (
    <div>
      {/* desktop view */}
      <div className="hidden md:flex justify-center bg-white border-b">
        {
          Object.values(CommunityType).map((menuType) => (
            <Link href={`/${PostTypeURL[postType]}/${menuType}`}>
              <Button variant="ghost"
                key={menuType}
                className={communityType === menuType ? hoveredTextColor : ''}
              >
                {menuType}
              </Button>
            </Link>
          ))
        }
      </div>

      {/* mobile view */}
      <div className="flex-center md:hidden mt-5">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a community" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
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
    </div>
  )
}
