import {useState} from 'react'
import {Images} from '../../../utils';
import { useNavigate } from 'react-router-dom';
import { getUserData, setUserData } from '../../../utils/localStorage';

type SignUpForm = {
  name: string;
  email: string;
  address: string;
  password: string;
}

function Signup() {
  const navigate = useNavigate();
  const [state, setState] = useState<SignUpForm>({
    name: '',
    email: '',
    address: '',
    password: ''
  });
  const [error, setError] = useState("");

  const onChangeInput = (event: any) => {
    const { name, value } = event.target;
    setState(prevState => ({...prevState, [name]: value}));
  }

  const submitForm = async (event: any) => {
    event.preventDefault();
    const user = await getUserData();
    if(!user || user?.some((_user: SignUpForm) => _user.email !== state.email)){
      setUserData(!user ? [state] : [...user, state])
      navigate("/sign-in");
      setError("");
    }else{
      setError("User already exist with given email");
    }
  }

  
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-10 w-auto"
        src={Images.LOGO}
        alt="Shoping platform"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign up to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={submitForm}>
        {error && (<div>
          <p className='text-red-400'>{error}</p>
        </div>)}
        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
            Name
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              required
              onChange={onChangeInput}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

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
          <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
            Address
          </label>
          <div className="mt-2">
            <input
              id="address"
              name="address"
              type="text"
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
        
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Signup