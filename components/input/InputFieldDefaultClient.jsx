export default function InputFieldDefaultClient({type="text", name, value, placeholder, onChangeHandler}) {
  return (
    <label className="w-full">
      <span className="font-satoshi font-semibold text-base text-gray-700">
        {name}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        required
        className="form_input"
      />
    </label>
  )
}
