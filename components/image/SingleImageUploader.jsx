"use client"
import imageCompression from "browser-image-compression";
import {useState} from "react";

export default function SingleImageUploader({disabled, children, onLoadEnd, setIsLoading}) {
  async function handleImageChange(e) {
    const file = e.target.files[0];
    e.target.value = '' // To detect the same file later.

    if (!file) return;

    setIsLoading(true);

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
        setIsLoading(false)
      };
    }
    catch (error) {
      console.error(error);
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full h-full">
      <input
        type="file"
        id="file-input"
        style={{display: 'none'}}
        accept="image/*,image/heic"
        disabled={disabled}
        onChange={handleImageChange}
      />
      <label htmlFor="file-input">
        {children}
      </label>
    </div>
  )
}
