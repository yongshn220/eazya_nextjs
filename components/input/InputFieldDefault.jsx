export default function InputFieldDefault({title, value, placeholder, onChangeHandler}) {
  return (
    <label className="w-full">
      <span className="font-satoshi font-semibold text-base text-gray-700">
        {title}
      </span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
        required
        className="form_input"
      />
    </label>
  )
}
