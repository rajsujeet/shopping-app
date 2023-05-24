import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../redux/store";
import { useEffect } from "react";
import { getUserFromStore } from "../redux/features/authSlice";
import Signin from "../pages/auth/signin";
import Signup from "../pages/auth/signup";
import AppLayout from "./AppLayout";
import HomePage from '../pages/home';
import loadable from "@loadable/component";

const AppRouters = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      dispatch(getUserFromStore());
    }
  }, []);

  useEffect(() => {
    if (!!user && location.pathname == "/") {
      navigate("/home")
    }
  }, [user])

  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/home" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="cart" element={<LoadablePage page="cart" />} />
      </Route>
      <Route path="success" element={<LoadablePage page="success" />} />
    </Routes>
  )
}

export default AppRouters;

const LoadablePage = loadable((props: any) => import(`../pages/${props.page}`), {
  fallback: <div>Page is Loading...</div>,
  cacheKey: (props: any) => props.page
});