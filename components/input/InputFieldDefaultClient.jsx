export default function InputFieldDefaultClient({name, value, placeholder, onChangeHandler}) {
  return (
    <label className="w-full">
      <span className="font-satoshi font-semibold text-base text-gray-700">
        {name}
      </span>
      <input
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
