

export default function SellingItemBox() {
  return (
    <div className="group relative glass_box">
      <div
        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-50">
        <img
          src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
          alt="Front of men&#039;s Basic Tee in black."
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <h3 className="text-sm text-gray-700">
          <a href="#" className="line-clamp-2">
            <span aria-hidden="true" className="absolute inset-0"></span>
            This is a sample item title This is a sample item title
          </a>
        </h3>
        <p className="text-md font-medium text-gray-900">$35</p>
      </div>
    </div>
  )
}
