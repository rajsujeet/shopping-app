import {useEffect, useState} from 'react'
import {Images} from '../../../utils';
import { useNavigate } from 'react-router-dom';
import { getUserData, setUser } from '../../../utils/localStorage';
import { storeUser } from '../../../redux/features/authSlice';
import { useAppDispatch } from '../../../redux/store';

type SignInForm = {
  email: string;
  password: string;
}

function Signin() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const [state, setState] = useState<SignInForm>({
    email: '',
    password: ''
  });
  const [error, setError] = useState("");

  const onChangeInput = (event: any) => {
    const { name, value } = event.target;
    setState(prevState => ({...prevState, [name]: value}));
  }

  const submitForm = async (event: any) => {
    event.preventDefault();
    // Store User email & navigate to product page
    const users = await getUserData();
    if(users?.some((user: any) => (user.email === state.email && user.password === state.password))){
      const data = users.find((_user: any) => _user.email === state.email);
      delete data.password;
      dispatch(storeUser(data))
      navigate("/home");
      setError("");
    }else{
      setError("User does not exist with given email & password");
    }
  }

  const onSignup = () => navigate('/sign-up');

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-10 w-auto"
        src={Images.LOGO}
        alt="Shoping platform"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={submitForm}>
        {error && (<div>
          <p className='text-red-400'>{error}</p>
        </div>)}
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={onChangeInput}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              onChange={onChangeInput}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="text-sm text-end mt-2">
            <a href="#" className="font-semibold text-cyan-600 hover:text-cyan-500">
              Forgot password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full mb-5 justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            Sign in
          </button>

          <p className='text-center'>OR</p>
          <button
            onClick={onSignup}
            className="flex w-full mt-5 justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Signin