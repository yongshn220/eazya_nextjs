

export default function ImagePost() {
  return (
    <div className="group relative">
      <div
        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-50">
        <img
          src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
          alt="Front of men&#039;s Basic Tee in black."
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-gray-700 line-clamp-2">
        <a href="#">
          <span aria-hidden="true" className="absolute inset-0"></span>
          This is a sample title for the event post This is a sample title for the event post
        </a>
      </h3>
    </div>
  )
}
