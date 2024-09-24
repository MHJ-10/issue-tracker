'use client';

import { ReactNode } from 'react';
import { useCloseElement } from '../hooks/useCloseElement';

interface Props {
  children: ReactNode;
  root: ReactNode;
  showDropdown: boolean;
  onClose: () => void;
}

const Dropdown = ({ children, root, showDropdown, onClose }: Props) => {
  const dropdownRef = useCloseElement<HTMLDivElement>(onClose);

  return (
    <div ref={dropdownRef} className='relative inline-block text-left'>
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
