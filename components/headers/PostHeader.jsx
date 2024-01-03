import {Button} from "@components/ui/button";
import Link from 'next/link'
import InfoHeader from "@components/headers/InfoHeader";
import {HamburgerMenuIcon} from "@node_modules/@radix-ui/react-icons";

export default function PostHeader({ title, subtitle }) {
  return (
    <div>
      <div className="w-full flex sm:flex-col pb-3 border-b">
        <p className="font-semibold">
          SBU {title}
          {
            subtitle !== "" &&
            <span className="ml-2 font-normal">
              / {subtitle}
            </span>
          }
        </p>
      </div>

      <div className="w-full flex-center gap-6 mt-10 mb-5">
        <InfoHeader/>
        <div className="cursor-pointer">
          <HamburgerMenuIcon width={25} height={25} />
        </div>
      </div>
    </div>
  )
}
