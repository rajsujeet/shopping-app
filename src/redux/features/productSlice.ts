import { createSlice } from '@reduxjs/toolkit'
import { productApi } from '../services/product'
import { RootState } from '../store'

type ActivityState = {
  products: Array<any>
  cart: Array<any>
}

const initialState: ActivityState = {
  products: [],
  cart: []
}

const productSlice: any = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = [...state.cart, {...action.payload, qty: 1}]
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((c) => c.id !== action.payload.id)
    },
    updateQuantity: (state, action) => {
      state.cart = state.cart.filter((c) =>
        c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
      )
    },
    cleanCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
    .addMatcher(productApi.endpoints.getProduct.matchPending, (state, { payload }) => {
      console.log("getProduct.matchPending========")
    })
      .addMatcher(productApi.endpoints.getProduct.matchFulfilled, (state, { payload }) => {
        state.products = payload.data;
        console.log("   state.products========", payload)
      }) .addMatcher(productApi.endpoints.getProduct.matchRejected, (state, action) => {
        console.log('rejected', action)
      })
  },
})

export const { addToCart, removeFromCart, updateQuantity, cleanCart } = productSlice.actions
export default productSlice.reducer

export const selectCart = (state: RootState) => state.product?.cart;
