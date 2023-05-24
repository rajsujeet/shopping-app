import { useNavigate } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();
  const onBack = () => navigate('/home');

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-5xl font-bold text-indigo-600">Success</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl">Product successfully ordered</h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a href="#" onClick={onBack} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</a>
          <a href="#" className="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    </main>
  )
}

export default Success