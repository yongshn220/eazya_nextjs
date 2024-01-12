"use client"

import Image from "next/image";
import {VoteType} from "@components/constants/enums";
import triangleIcon from "@public/assets/icons/triangle.svg";
import filledTriangleIcon from "@public/assets/icons/filledTriangle.svg"
import invertedTriangleIcon from "@public/assets/icons/invertedTriangle.svg"
import invertedFilledTriangle from "@public/assets/icons/invertedFilledTriangle.svg"


export default function InfoHeader({author, date, votes, createVoteHandler, myVoteType}) {
  myVoteType = myVoteType ?? VoteType.NONE

  return (
    <div className="w-full flex-between">
      <div className="flex-center gap-5">
        <div className="flex flex-center gap-2">
          <img className="h-6 w-6 flex-none rounded-full bg-gray-50"
               src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
               alt=""
          />
          <p className="text-sm font-semibold">{author}</p>
        </div>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <div className="flex-center px-2 py-1 border border-gray-300 rounded-full">
        <Image src={(myVoteType === VoteType.UP)? filledTriangleIcon : triangleIcon} width={15} height={15} className="mr-2 cursor-pointer" alt="triangle"
          onClick={() => createVoteHandler(VoteType.UP)}
        />
        <p className="border-l border-r px-2 font-satoshi">{votes}</p>
        <Image src={(myVoteType === VoteType.DOWN) ? invertedFilledTriangle : invertedTriangleIcon} width={15} height={15} className="ml-2 cursor-pointer" alt="inverted triangle"
          onClick={() => createVoteHandler(VoteType.DOWN)}
        />
      </div>
    </div>
  )
}
