import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { getUser, getUserData, resetStorage, setUser, setUserData } from '../../utils/localStorage'
import { useNavigate } from 'react-router-dom'

type User = {
  name?: string
  email: string
  address?: string
}

type AuthState = {
  user: User | null
  isLoggedIn: boolean | false
}

export const getUserFromStore = createAsyncThunk(
  'auth/getUserFromStore',
  async () => {
    return await getUser();
  }
)

export const logoutStore = createAsyncThunk(
  'auth/logoutStore',
  async () => {
    return await resetStorage();
  }
)

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
}

const authSlice: any = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeUser: (state, action) => {
      setUser(action.payload);
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    //service call
    builder
    .addCase(getUserFromStore.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    builder.addCase(logoutStore.fulfilled, (state, action) => {
      console.log("logoutStore.fulfilled======before===", state)
      state.user = null;
      console.log("logoutStore.fulfilled====after=====", state)
    });
  },
})

export const { storeUser } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth?.user;
