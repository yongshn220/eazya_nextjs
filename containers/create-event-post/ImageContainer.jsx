import {Cross2Icon} from "@radix-ui/react-icons";
import LoadingCircle from "@components/animation/LoadingCircle";
import {hoveredTextColor} from "@components/constants/values";
import Image from 'next/image'

export default function ImageContainer({ post, isImageLoading, handleRemove }) {
  if (post.image) {
    return (
      <div className="relative hidden sm:flex justify-center items-center w-[18rem] h-full border border-dashed rounded-lg">
        <Image src={post.image} layout="fill" objectFit="contain" className="object-contain" alt="EventImage"/>
        <Cross2Icon className="absolute right-0 top-0 m-3 cursor-pointer" width={20} height={20} onClick={handleRemove} />
      </div>
    );
  }
  else {
    return (
      <div
        className={
          `relative hidden sm:flex justify-center items-center w-[18rem] h-full border rounded-lg group 
          ${post.image ? '' : 'cursor-pointer hover:border-blue-300'}`}
      >
        {isImageLoading ? <LoadingCircle /> : <p className={`text-gray-500 group-hover:${hoveredTextColor}`}>Add Image</p>}
      </div>
    );
  }
}
