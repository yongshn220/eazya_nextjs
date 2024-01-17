export default function InputFieldDescriptionClient({name, value, placeholder, onChangeHandler}) {
  return (
    <label className="w-full ">
      <span className="font-satoshi font-semibold text-base text-gray-700">
        {name}
      </span>
      <textarea
        value={value}
        name={name}
        placeholder={placeholder}
        required
        className="form_textarea"
        onChange={onChangeHandler}
      >
      </textarea>
    </label>
  )
}
