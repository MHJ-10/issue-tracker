'use client';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  root: ReactNode;
  showDropdown: boolean;
}

const Dropdown = ({ children, root, showDropdown }: Props) => {
  return (
    <div className='relative inline-block text-left'>
      <div>{root}</div>
      {showDropdown && (
        <div className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
