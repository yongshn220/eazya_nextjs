

export default function TextPostItem() {
  return (
    <li className="flex justify-between gap-x-4 py-5">
      <div className="flex flex-col  gap-3">
        <div className="flex items-center gap-5">
          <div className="flex flex-center gap-2">
            <img className="h-6 w-6 flex-none rounded-full bg-gray-50"
                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                 alt=""/>
            <p className="text-sm font-semibold">CSE Major</p>
          </div>
          <p className="text-sm text-gray-500">D-4</p>
        </div>
        <p className="text-md font-semibold leading-6 text-gray-900 line-clamp-1">This is sample post title This is sample post title This is sample post title</p>
      </div>
      <div className="shrink-0 flex flex-col items-end  gap-3">
        <div className="mt-1 flex items-center gap-x-1.5">
          <div className="flex-none rounded-full bg-emerald-500/20 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
          </div>
          <p className="text-xs leading-5 text-gray-500">423</p>
        </div>
        <div className="mt-1 flex items-center gap-x-1.5">
          <div className="flex-none rounded-full bg-emerald-500/20 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
          </div>
          <p className="text-xs leading-5 text-gray-500">423</p>
        </div>
      </div>
    </li>
  )
}
