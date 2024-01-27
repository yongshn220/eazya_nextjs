
export default function SingleImageUploader({setImage, disabled, setIsLoading, children}) {
  async function handleImageChange(e) {
    e.preventDefault()
    setIsLoading(true);

    const file = e.target.files[0];
    if (!file) return;

    try {
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
