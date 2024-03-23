import { ReactNode } from 'react';
import { BsChevronDown } from 'react-icons/bs';

interface Props {
  placeholder: string;
  showSelect: boolean;
  children: ReactNode;
  onClick: () => void;
}

const Select = ({ placeholder, showSelect, onClick, children }: Props) => {
  return (
    <div className='relative mt-2 flex flex-row gap-1'>
      <div
        className='relative flex w-full items-center justify-between rounded-md bg-white px-2 py-1  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-300 sm:text-sm sm:leading-6'
        onClick={onClick}
      >
        <span>{placeholder}</span>
        <BsChevronDown
          className={`${showSelect && 'rotate-180'} transition-all duration-300`}
        />
      </div>
      {showSelect && (
        <ul className='absolute z-10 mt-8 max-h-56 w-full divide-y divide-slate-300 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
          {children}
        </ul>
      )}
    </div>
  );
};

export default Select;
