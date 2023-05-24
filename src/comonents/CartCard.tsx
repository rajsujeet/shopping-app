import React from 'react'
import { Product } from '../pages/home'

type CartCardParam = {
  product: Product
  updateCartQntHandler: (event: any, id: any) => void
  removeFromCartHandler: (id: any) => void
}

function CartCard({
  product,
  updateCartQntHandler = () => null,
  removeFromCartHandler = () => null
}: CartCardParam) {
  return (
    <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
      <div className="md:w-4/12 2xl:w-1/4 w-full">
        <img src={product?.images[0]} alt="Black Leather Bag" className="h-full object-center object-cover md:block hidden" />
      </div>
      <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
        <p className="text-xs leading-3 text-gray-800 dark:text-white md:pt-0 pt-4">{product?.category}</p>
        <div className="flex items-center justify-between w-full pt-1">
          <p className="text-base font-black leading-none text-gray-800 dark:text-white">{product?.title}</p>
          <select onChange={(event) => updateCartQntHandler(event, product.id)} value={product.qty} aria-label="Select quantity" className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
            {[...Array(product.stock).keys()]?.map((x) => (
              <option key={x + 1}>{x + 1}</option>
            ))}
          </select>
        </div>
        <p className="text-xs leading-3 text-gray-600 dark:text-white pt-2">Rating: {product?.rating}</p>
        <div className="flex items-center justify-between pt-5">
          <div className="flex itemms-center">
            <p className="text-xs leading-3 underline text-red-500 cursor-pointer" onClick={() => removeFromCartHandler(product.id)}>Remove</p>
          </div>
          <p className="text-base font-black leading-none text-gray-800 dark:text-white mr-5">${product?.price}</p>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CartCard)