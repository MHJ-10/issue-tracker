import { Metadata } from 'next';
import Link from 'next/link';
import { TbError404 } from 'react-icons/tb';

const NotFoundPage = () => {
  return (
    <div className='flex h-96 flex-col items-center justify-center gap-5'>
      <TbError404 className='size-32 text-blue-500' />
      <p className='text-center text-xl sm:text-2xl'>
        This page could not be found.
      </p>
      <Link
        className='rounded-md bg-blue-500 px-3 py-2 text-white ring-2 ring-slate-200 transition-colors duration-300 hover:bg-slate-200 hover:text-blue-500 hover:ring-blue-500'
        href='/'
      >
        Go Back
      </Link>
    </div>
  );
};

export default NotFoundPage;

export const metadata: Metadata = {
  title: 'Not Found Page',
  description: 'not found page',
};
