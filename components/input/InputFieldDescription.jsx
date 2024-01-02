export default function InputFieldDescription({title, value, placeholder, onChangeHandler}) {
  return (
    <label className="w-full ">
      <span className="font-satoshi font-semibold text-base text-gray-700">
        {title}
      </span>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
        required
        className="form_textarea"
      >
      </textarea>
    </label>
  )
}
