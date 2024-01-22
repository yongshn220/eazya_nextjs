"use client"

import {VoteType} from "@components/constants/enums";
import TriangleIcon from "@public/assets/icons/triangle.svg";
import FilledTriangleIcon from "@public/assets/icons/filledTriangle.svg"
import InvertedTriangleIcon from "@public/assets/icons/invertedTriangle.svg"
import InvertedFilledTriangleIcon from "@public/assets/icons/invertedFilledTriangle.svg"
import {Badge} from "@components/ui/badge";
import {useState} from "react";


export default function InfoHeader({author, date, votes, createVoteHandler, myVoteType, isMine}) {
  const [vote, setVote] = useState({
    count: votes,
    type: myVoteType,
  })

  function handleVoting(newType: VoteType) {
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
    <div className="w-full flex-between">
      <div className="flex-center gap-5">
        <div className="flex flex-center gap-2">
          <img className="h-6 w-6 flex-none rounded-full bg-gray-50"
               src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
               alt=""
          />
          <p className="text-sm font-semibold">
            {isMine? author : `User_${author}`}
          </p>
          <Badge variant="outline" className="border-gray-300">CSE</Badge>
          {isMine && <Badge className="bg-blue-400 hover:bg-blue-400">Me</Badge>}
        </div>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <div className="flex-center px-2 py-1 border border-gray-300 rounded-full">
        <div className="mr-1 cursor-pointer" onClick={() => handleVoting(VoteType.UP)}>
          {
            (vote.type === VoteType.UP) ? <FilledTriangleIcon/> : <TriangleIcon/>
          }
        </div>
        <p className="border-l border-r px-2 font-satoshi">{vote.count}</p>
        <div className="ml-1 cursor-pointer" onClick={() => handleVoting(VoteType.DOWN)}>
          {
            (vote.type === VoteType.DOWN) ? <InvertedFilledTriangleIcon/> : <InvertedTriangleIcon/>
          }
        </div>
      </div>
    </div>
  )
}