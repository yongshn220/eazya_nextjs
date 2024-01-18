export default function InputFieldPriceClient({name, value, placeholder, onChangeHandler}) {
  return (
    <label className="w-full">
      <span className="font-satoshi font-semibold text-base text-gray-700">
        {name}
      </span>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <span className={`${value ? "text-gray-600" : "text-gray-400"}`}>$</span>
        </span>
        <input
          type="number"
          name={name}
          value={value}
          onChange={onChangeHandler}
          placeholder={placeholder}
          required
          className="form_input [&]:pl-6"
        />
      </div>
    </label>
  )
}
