import { Skeleton } from '../components';

const RegisterLoadingPage = () => {
  return (
    <div className='mx-auto flex w-full flex-col justify-center rounded-md border border-slate-200 p-2 sm:w-3/4 md:w-2/3 '>
      <p className='mx-auto my-2 w-1/3'>
        <Skeleton height={32} />
      </p>

      <Skeleton className='form-input my-2' height={55} count={4} />

      <div className='mx-auto inline-block w-2/3 rounded py-3 sm:w-1/3'>
        <Skeleton height={40} />
      </div>

      <p className='mx-auto mt-2 w-2/3 sm:w-1/3'>
        <Skeleton height={22} />
      </p>
    </div>
  );
};

export default RegisterLoadingPage;
