import { Badge } from "@components/ui/badge"
import Link from 'next/link'
import getGeneralPostAction from "@actions/general/getGeneralPostAction";
import {getNumOfCommentsInPost} from "@components/constants/helperFunctions";

export default async function GeneralDetailPostItem({id}) {
  const post = await getGeneralPostAction(id)
  if (!post) {
    return <></>
  }

  const numberOfComments = getNumOfCommentsInPost(post)

  return (
    <div>
      <Link href={`/general/${id}`}>
        <div className="flex flex-col py-5 gap-4 cursor-pointer">
          <div className="flex items-center gap-5">
            <div className="flex flex-center gap-2">
              <img className="h-6 w-6 flex-none rounded-full bg-gray-50"
                   src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                   alt=""/>
              <p className="text-sm font-semibold">CSE Major</p>
            </div>
            <p className="text-sm text-gray-500">{post.createdAt}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className={`text-lg font-semibold leading-6 text-gray-900 line-clamp-1 hover_text_blue`}>
              {post.title}
            </p>
            <p className={`text-sm leading-6 text-gray-900 line-clamp-2 hover_text_blue`}>
              {post.description}
            </p>
          </div>

          <div className="flex flex-between">
            <div className="flex gap-2">
              <Badge variant="outline">General</Badge>
              <Badge variant="outline">General</Badge>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                </div>
                <p className="text-xs leading-5 text-gray-500">{post.votes}</p>
              </div>
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                </div>
                <p className="text-xs leading-5 text-gray-500">{numberOfComments}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}