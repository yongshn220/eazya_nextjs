export default function InputFieldDefault({name, value, placeholder}) {
  return (
    <label className="w-full">
      <span className="font-satoshi font-semibold text-base text-gray-700">
        {name}
      </span>
      <input
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        required
        className="form_input"
      />
    </label>
  )
}
