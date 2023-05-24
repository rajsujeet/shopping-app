import React from 'react'
import { Product } from '../pages/home'

type ProductCardParam = {
  product: Product
  cart: Array<Product>
  removeFromCartHandler: (id: any) => void
  addToCardHandler: (product: Product) => void
}

function ProductCard({
  product,
  cart = [],
  removeFromCartHandler = () => null,
  addToCardHandler = () => null
}: ProductCardParam) {
  return (
    <div className="group relative">
      <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={product?.images[0]}
          alt={product?.images[0]}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            {product.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.rating}/5</p>
        </div>
        <p className="text-sm font-medium text-gray-900">${product.price}</p>
      </div>
      {cart?.some((prod: any) => prod.id == product.id) ? (
        <button className="bg-red-300 w-full p-1 mt-5" onClick={() => removeFromCartHandler(product.id)}>Remove from Card</button>
      ) : (
        <button className="bg-cyan-300 w-full p-1 mt-5" disabled={!product.stock} onClick={() => addToCardHandler(product)}>{!product.stock ? "Out of Stock" : "Add to Cart"}</button>
      )}
    </div>
  )
}

export default React.memo(ProductCard)