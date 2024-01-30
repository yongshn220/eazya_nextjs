import { v4 as uuid } from 'uuid';
import {ImageData} from "@containers/edit-store-post";
import {Dispatch, SetStateAction} from "react";

interface Props {
  images: Array<ImageData>;
  setImages: Dispatch<SetStateAction<Array<ImageData>>>;
  maxNum: number;
  children: any;
}

export default function MultipleImageUploader({images, setImages, maxNum, children}: Props) {
  async function handleImageChange(e) {
    const files = Array.from(e.target.files) as Array<File>
    const totalImages = images.length + files.length

    try {
      if (totalImages <= maxNum) {
        files.forEach((file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          const imageId = uuid()
          setImages((prev) =>([...prev, {id: imageId, file: file, url: null, isLoading: true}]))

          reader.onloadend = () => {
            setImages((prevImages) => {
              return prevImages.map(prev => {
                return (prev.id !== imageId)? prev : {...prev, url: reader.result.toString(), isLoading: false}
              })
            })
          };
        })
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
    }
  }

  return (
    <div className="h-full">
      <input
        type="file"
        id="file-input"
        name="Image"
        style={{display: 'none'}}
        accept="image/*"
        onChange={handleImageChange}
        multiple
      />
      <label htmlFor="file-input">
        {children}
      </label>
    </div>
  )
}
