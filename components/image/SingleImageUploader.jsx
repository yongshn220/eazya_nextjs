"use client"
import imageCompression from "browser-image-compression";
import {useState} from "react";

export default function SingleImageUploader({children, onLoadEnd}) {
  const [isLoadingImage, setIsLoadingImage] = useState(false)

  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoadingImage(true);

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };

      const compressedFile = await imageCompression(file, options);

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        onLoadEnd(reader.result)
        setIsLoadingImage(false)
      };
    }
    catch (error) {
      console.error(error);
      setIsLoadingImage(false)
    }
  }

  return (
    <div>
      <input
        type="file"
        id="file-input"
        style={{display: 'none'}}
        accept="image/*,image/heic"
        onChange={handleImageChange}
      />
      <label htmlFor="file-input">
        {children}
      </label>
    </div>
)
}
