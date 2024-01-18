import {Cross2Icon} from "@radix-ui/react-icons";
import LoadingCircle from "@components/animation/LoadingCircle";
import {hoveredTextColor} from "@components/constants/values";
import Image from 'next/image'

export default function ImageContainer({image, handleRemove, isLoading }) {
  if (image) {
    return (
      <div
        className="relative hidden sm:flex justify-center items-center w-[18rem] h-full border border-dashed rounded-lg">
        <Image src={image} layout="fill" className="object-contain" alt="EventImage"/>
        <Cross2Icon className="absolute right-0 top-0 m-3 cursor-pointer" width={20} height={20}
                    onClick={handleRemove}/>
      </div>
    );
  }
  else {
    return (
      <div className={ `relative hidden sm:flex justify-center items-center w-[18rem] h-full border rounded-lg group ${isLoading ? '' : 'cursor-pointer hover:border-blue-300'}` } >
        {
          isLoading
          ? <LoadingCircle/>
          : <p className={`text-gray-500 hover_text_blue`}>Add Image</p>
        }
      </div>
    );
  }
}
