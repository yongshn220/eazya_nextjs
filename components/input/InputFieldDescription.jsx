export default function InputFieldDescription({name, value, placeholder}) {
  return (
    <label className="w-full ">
      <span className="font-satoshi font-semibold text-base text-gray-700">
        {name}
      </span>
      <textarea
        defaultValue={value}
        name={name}
        placeholder={placeholder}
        required
        className="form_textarea"
      >
      </textarea>
    </label>
  )
}
