import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  showDialog: boolean;
}

const Dialog = ({ showDialog, children }: Props) => {
  return (
    showDialog && (
      <div className='relative z-10' role='dialog'>
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
              <div className='bg-white p-3'>{children}</div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Dialog;
