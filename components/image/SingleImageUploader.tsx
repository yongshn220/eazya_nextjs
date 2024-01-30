import {Image} from "@containers/create-event-post/EventForm";
import {Dispatch, SetStateAction} from "react";

interface Props {
  setImage: Dispatch<SetStateAction<Image>>,
  disabled: boolean,
  children: any
}

export default function SingleImageUploader({setImage, disabled, children}: Props) {
  async function handleImageChange(e) {
    e.preventDefault()
    setImage((prev) => ({...prev, isLoading: true}))

    const file = e.target.files[0];

    if (!file) return;

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage({file: file, url: reader.result.toString(), isLoading: false})
      };
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setImage((prev) => ({...prev, isLoading: false}))
    }
  }

  return (
    <div className="w-full h-full">
      <input
        type="file"
        id="file-input"
        name="Image"
        style={{display: 'none'}}
        accept="image/*"
        disabled={disabled}
        onChange={handleImageChange}
      />
      <label htmlFor="file-input">
        {children}
      </label>
    </div>
  )
}
