"use client"

import {VoteType} from "@components/constants/enums";
import TriangleIcon from "@public/assets/icons/triangle.svg";
import FilledTriangleIcon from "@public/assets/icons/filledTriangle.svg"
import InvertedTriangleIcon from "@public/assets/icons/invertedTriangle.svg"
import InvertedFilledTriangleIcon from "@public/assets/icons/invertedFilledTriangle.svg"
import {Badge} from "@components/ui/badge";
import React, {useState} from "react";
import {UserHexaIcon} from "@components/icon/icons";
import {useSession} from "@node_modules/next-auth/react";


export default function InfoHeader({author, authorMajor, date, votes, createVoteHandler, myVoteType, isMine}) {
  const [vote, setVote] = useState({
    count: votes,
    type: myVoteType,
  })
  const { data: session } = useSession()

  function handleVoting(newType: VoteType) {
    if (!session) return

    setVote((prev) => {
      if (vote.type === VoteType.NONE) {
        if (newType === VoteType.UP)
          return {count: prev.count + 1, type: VoteType.UP}
        if (newType === VoteType.DOWN)
          return {count: prev.count - 1, type: VoteType.DOWN}
      }
      if (vote.type === VoteType.UP) {
        if (newType === VoteType.UP)
          return {count: prev.count - 1, type: VoteType.NONE}
        if (newType === VoteType.DOWN)
          return {count: prev.count - 2, type: VoteType.DOWN}
      }
      if (vote.type === VoteType.DOWN) {
        if (newType === VoteType.UP)
          return {count: prev.count + 2, type: VoteType.UP}
        if (newType === VoteType.DOWN)
          return {count: prev.count + 1, type: VoteType.NONE}
      }
      else return prev
    })
    createVoteHandler(newType)
  }

  return (
    <div className="w-full flex justify-between">
      <div className="flex-start flex-col gap-2 sm:flex-row sm:gap-5">
        <div className="flex flex-center gap-2">
          <UserHexaIcon/>
          <p className="text-sm font-semibold">
            {(author === "Author")? author : `User_${author}`}
          </p>
          <Badge variant="outline" className="border-gray-300">{authorMajor}</Badge>
          {isMine && <Badge className="bg-blue-400 hover:bg-blue-400">Me</Badge>}
        </div>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <div className="flex-center px-2 py-1 border border-gray-300 rounded-full h-8">
        <div className={`mr-1 ${session? "cursor-pointer" : "text-gray-400"}`} onClick={() => handleVoting(VoteType.UP)}>
          {
            (vote.type === VoteType.UP) ? <FilledTriangleIcon/> : <TriangleIcon/>
          }
        </div>
        <p className="border-l border-r px-2 font-satoshi">{vote.count}</p>
        <div className={`ml-1 ${session? "cursor-pointer" : "text-gray-400"}`} onClick={() => handleVoting(VoteType.DOWN)}>
          {
            (vote.type === VoteType.DOWN) ? <InvertedFilledTriangleIcon/> : <InvertedTriangleIcon/>
          }
        </div>
      </div>
    </div>
  )
}
