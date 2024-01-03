import Image from 'next/image'

export default function Comment() {
  return (
    <div className="flex flex-col py-5 gap-4 border-b">
      <div className="flex-between">
        <div className="flex-center gap-5">
          <div className="flex flex-center gap-2">
            <img className="h-6 w-6 flex-none rounded-full bg-gray-50"
                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                 alt=""/>
            <p className="text-sm font-semibold">CSE Major</p>
          </div>
          <p className="text-sm text-gray-500">4 hours ago</p>
        </div>
        <div className="flex-center px-2 py-1 border border-gray-400 rounded-lg">
          <Image src="/assets/icons/filledTriangle.svg" width={15} height={15} className="mr-2 cursor-pointer"/>
          <p className="border-l border-r px-2">12</p>
          <Image src="/assets/icons/invertedTriangle.svg" width={15} height={15} className="ml-2 cursor-pointer"/>
        </div>
      </div>

      <p className="text-sm leading-6 text-gray-900">This is a sample text description of the SBU Community. This is a sample text description of the SBU Community. This is a sample text description of the SBU Community. This is a sample text description of the SBU Community. This is a sample text description of the SBU Community. This is a sample text description of the SBU Community.</p>
      <p className="text-xs leading-5 text-gray-500">Reply</p>
    </div>
  )
}
