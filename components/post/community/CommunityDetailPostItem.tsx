import { Badge } from "@components/ui/badge"
import Link from 'next/link'
import {getNumOfCommentsInPost} from "@components/constants/helperFunctions";
import {getCommunityPostPath} from "@components/constants/tags";
import {CommentIcon, UserHexaIcon, VoteIcon} from "@components/icon/icons";
import React from "react";

export default function CommunityDetailPostItem({post, postType, communityType}) {
  const numberOfComments = getNumOfCommentsInPost(post)

  return (
    <div>
      <Link href={getCommunityPostPath(post.id, postType, communityType)}>
        <div className="group flex flex-col py-5 gap-4 cursor-pointer">
          <div className="flex items-center gap-5">
            <div className="flex flex-center gap-2">
              <UserHexaIcon/>
              <p className="text-sm">SBU Student</p>
              <Badge variant="outline" className="border-gray-300">{post.authorMajor}</Badge>
            </div>
            <p className="text-sm text-gray-500">{post.createdAt}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className={`text-lg font-semibold leading-6 text-gray-900 line-clamp-1 hover_text_blue`}>
              {post.title}
            </p>
            <p className={`text-sm leading-6 text-gray-900 line-clamp-2`}>
              {post.description}
            </p>
          </div>

          <div className="flex flex-between">
            <div className="flex gap-2">
              <Badge variant="outline">{post.communityType}</Badge>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 flex items-center gap-x-1.5">
                <VoteIcon/>
                <p className="text-xs leading-5 text-gray-500">{post.votes}</p>
              </div>
              <div className="mt-1 flex items-center gap-x-1.5">
                <CommentIcon/>
                <p className="text-xs leading-5 text-gray-500">{numberOfComments}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
