import React, { useEffect, useState } from 'react'
import { useGetProductMutation } from '../../redux/services/product';
import { addToCart, removeFromCart, selectCart } from '../../redux/features/productSlice';
import { useAppDispatch, useTypedSelector } from '../../redux/store';
import {ProductCard, Sort} from '../../comonents';

export type Product = {
  brand: string
  category: string
  description: string
  discountPercentage: string | number
  id: number
  images: Array<string>
  price: string | number
  rating: string
  stock: number
  thumbnail: string
  title: string
  qty?: number
}

const sortData = [
  {
    id: "lowToHigh",
    name: "Ascending",
    isChecked: false
  },
  {
    id: "highToLow",
    name: "Descending",
    isChecked: false
  }
]
function Home() {
  const dispatch = useAppDispatch()
  const [ products, setProducts ] = useState<Array<Product>>([]);
  const [ sorts, setSorts ] = useState(sortData);
  const cart: Array<Product> = useTypedSelector(selectCart);
  const [
    getProduct,
    {
      isLoading: productLoading,
      isSuccess: productSuccess,
      status: productStatus,
      error
    },
  ] = useGetProductMutation();

  useEffect(()=>{
    getProductHandler();
  }, []);

  
  const getProductHandler = async () => {
    try{
      const { products: _products } = await (await fetch("https://dummyjson.com/products")).json();
      setProducts(_products);
      // const payload = {
      // };
      // console.log("Home=====one===")
      // if (!productLoading) {
      //   console.log("Home===two=====")
      //   await getProduct(payload).unwrap();
      // }
    }catch(err){

    }
  };

  const handleInput = (event: any, i: number) => {
    const _sorts = structuredClone(sorts);
    _sorts.map((item: any, j: number) => {
      if(i === j){
        item.isChecked = event.target.checked;
      }else {
        item.isChecked = false;
      }
    })
    setSorts(_sorts);
  }

  const addToCardHandler = (product: Product) => {
    dispatch(addToCart(product));
  }

  const removeFromCartHandler = (id: string | number) => {
    dispatch(removeFromCart({id}));
  }

  const transformProducts = () => {
    let actualProducts = products;
    const sort = sorts.find(sort=> sort.isChecked);

    if (sort) {
      actualProducts = actualProducts.sort((a: Product, b: Product) =>
        sort.id === "lowToHigh" ? Number(a.price) - Number(b.price) : Number(b.price) - Number(a.price)
      );
    }

    return actualProducts;
  };

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className='flex'>
            {sorts?.map((_sort: any, i: number) => {
              return(
                <Sort key={`${i}_${_sort.id}`} data={_sort} handleInput={(event) => handleInput(event, i)}/>
              )
            })}
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {transformProducts()?.map((product: Product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                cart={cart}
                addToCardHandler={addToCardHandler}
                removeFromCartHandler={removeFromCartHandler}
              />
              // <div key={product.id} className="group relative">
              //   <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              //     <img
              //       src={product?.images[0]}
              //       alt={product?.images[0]}
              //       className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              //     />
              //   </div>
              //   <div className="mt-4 flex justify-between">
              //     <div>
              //       <h3 className="text-sm text-gray-700">
              //         {product.title}
              //       </h3>
              //       <p className="mt-1 text-sm text-gray-500">{product.rating}/5</p>
              //     </div>
              //     <p className="text-sm font-medium text-gray-900">${product.price}</p>
              //   </div>
              //   {cart?.some((prod) => prod.id == product.id) ? (
              //     <button className="bg-red-300 w-full p-1 mt-5" onClick={()=> removeFromCartHandler(product.id)}>Remove from Card</button>
              //   ) : (
              //     <button className="bg-cyan-300 w-full p-1 mt-5" disabled={!product.stock} onClick={()=> addToCardHandler(product)}>{!product.stock ? "Out of Stock" : "Add to Cart"}</button>
              //   )}
              // </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home