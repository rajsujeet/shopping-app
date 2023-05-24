import { Link, Outlet, useNavigate } from "react-router-dom";
import { Product } from "../pages/home";
import { useAppDispatch, useTypedSelector } from "../redux/store";
import { selectCart } from "../redux/features/productSlice";
import { logoutStore } from "../redux/features/authSlice";
import { Images } from "../utils";
import React from "react";

const AppLayout = () => {
  const cart: Array<Product> = useTypedSelector(selectCart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logoutStore());
    navigate("/");
  }

  return (
    <div>
      <nav className='flex flex-row h-20'>
        <div className='w-64'>
          <img
            className='mx-auto h-20 p-2 w-auto'
            src={Images.LOGO}
            alt="Shoping platform"
          />
        </div>

        <ul className='h-auto'>
          <li className='inline-block mr-5 ml-5 p-6 w-32'>
            <Link to="/home">Home</Link>
          </li>
          <li className='inline-block mr-5 p-6 w-64'>
            <Link to="/home/cart">
              My Card ({cart?.length})
            </Link>
          </li>
        </ul>
        <div className='p-6'>
          <button onClick={logOut}>Log Out</button>
        </div>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default React.memo(AppLayout);