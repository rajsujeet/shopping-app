import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../redux/store'
import { selectCart, updateQuantity, removeFromCart, cleanCart } from '../../redux/features/productSlice';
import { Product } from '../home';
import { useNavigate } from 'react-router-dom';
import { CartCard } from '../../comonents';

function Cart() {
  const dispatch = useAppDispatch();
  const cart: Array<Product> = useTypedSelector(selectCart);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const onBack = () => navigate(-1);

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr: Product) => acc + Number(curr.price) * (curr.qty || 0), 0)
    );
  }, [cart]);

  const updateCartQntHandler = (event: any, id: string | number) => {
    if (event.target.value) {
      dispatch(updateQuantity({id, qty: event.target.value}));
    }
  }

  const removeFromCartHandler = (id: string | number) => {
    dispatch(removeFromCart({id}));
  }

  const checkout = () => {
    navigate("/success");
    dispatch(cleanCart());
  }

  return (
    <div className="w-full h-full bg-black dark:bg-gray-900 bg-opacity-90 overflow-y-auto overflow-x-hidden" id="chec-div">
      <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
        <div className="flex items-end lg:flex-row flex-col justify-end" id="cart">
          {cart?.length > 0 ? (
            <div className="lg:w-full md:w-8/12 w-full lg:px-8 lg:py-14 md:px-6 px-4 md:py-8 py-4 bg-white dark:bg-gray-800 overflow-x-hidden lg:h-screen h-auto" id="scroll">
              <div className="flex items-center text-gray-500 hover:text-gray-600 dark:text-white cursor-pointer" onClick={onBack}>
                <img className="dark:hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/shopping-cart-1-svg1.svg" alt="previous" />
                <img className="dark:block hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/shopping-cart-1-svg1dark.svg" alt="previous" />
                <p className="text-sm pl-2 leading-none dark:hover:text-gray-200">Back</p>
              </div>
              <p className="lg:text-4xl text-3xl font-black leading-10 text-gray-800 dark:text-white pt-3">Bag</p>
              {cart?.map((prod: Product, index: number) => {
                return (
                  <CartCard 
                    key={`${prod.id}_${index}`}
                    product={prod}
                    updateCartQntHandler={updateCartQntHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                )
              })}
            </div>
          ) : (
            <div className='text-center lg:w-full md:w-8/12 w-full lg:px-8 lg:py-14 md:px-6 px-4 md:py-8 py-4 bg-white dark:bg-gray-800 overflow-y-hidden overflow-x-hidden lg:h-screen h-auto'>
              <div className="text-xl">No Item added in Card</div>
              <button className="bg-cyan-300 w-48 p-1 mt-5" onClick={onBack}>Go Back To Home</button>
            </div>
          )}
          <div className="lg:w-2/5 md:w-8/12 w-full bg-gray-100 dark:bg-gray-900 h-full">
            <div className="flex flex-col lg:h-screen h-auto lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between overflow-y-auto">
              <div>
                <p className="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-white">Summary</p>
                <div className="flex items-center justify-between pt-16">
                  <p className="text-base leading-none text-gray-800 dark:text-white">Subtotal</p>
                  <p className="text-base leading-none text-gray-800 dark:text-white">${total}</p>
                </div>
                <div className="flex items-center justify-between pt-5">
                  <p className="text-base leading-none text-gray-800 dark:text-white">Shipping</p>
                  <p className="text-base leading-none text-gray-800 dark:text-white">$0</p>
                </div>
                <div className="flex items-center justify-between pt-5">
                  <p className="text-base leading-none text-gray-800 dark:text-white">Tax</p>
                  <p className="text-base leading-none text-gray-800 dark:text-white">$0</p>
                </div>
              </div>
              <div>
                <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                  <p className="text-2xl leading-normal text-gray-800 dark:text-white">Total</p>
                  <p className="text-2xl font-bold leading-normal text-right text-gray-800 dark:text-white">${total}</p>
                </div>
                <button onClick={checkout} disabled={cart.length === 0} className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart