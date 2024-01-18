import { v4 as uuid } from 'uuid';
import {Image} from "@containers/create-store-post/StoreForm";

interface Props {
  images: Array<Image>;
  setImages: any;
  maxNum: number;
  children: any;
}

export default function MultipleImageUploader({images, setImages, maxNum, children}: Props) {
  async function handleImageChange(e) {
    const files = Array.from(e.target.files) as Array<File>
    const totalImages = images.length + files.length

    try {
      if (totalImages < maxNum) {
        files.forEach((file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          const imageId = uuid()
          setImages((prev) =>([...prev, {id: imageId, url: null, isLoading: true}]))

          reader.onloadend = () => {
            setImages((prevImages) => {
              return prevImages.map(prev => {
                return (prev.id === imageId)? prev : {...prev, url: reader.result, isLoading: false}
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
        accept="image/*,image/heic"
        onChange={handleImageChange}
        multiple
      />
      <label htmlFor="file-input">
        {children}
      </label>
    </div>
  )
}
