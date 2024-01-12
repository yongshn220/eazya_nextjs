import imageCompression from "browser-image-compression";

export default function SingleImageUploader({setImage, disabled, setIsLoading, children}) {
  async function handleImageChange(e) {
    const file = e.target.files[0];

    console.log(file)

    if (!file) return;

    setIsLoading(true);

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };

      // const compressedFile = await imageCompression(file, options);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setIsLoading(false)
        setImage(reader.result)
      };
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full h-full">
      <input
        type="file"
        id="file-input"
        name="Image"
        style={{display: 'none'}}
        accept="image/*,image/heic"
        disabled={disabled}
        onChange={handleImageChange}
        // onInput={handleImageChange}
      />
      <label htmlFor="file-input">
        {children}
      </label>
    </div>
  )
}
