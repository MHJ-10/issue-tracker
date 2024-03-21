'use client';

import { Skeleton } from '@/app/components';
import { httpService } from '@/services/httpService';
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';

const AssigneeSelect = () => {
  const [selectedUser, setSelectedUser] = useState<User>();
  const [showSelect, setShowSelect] = useState<boolean>(false);

  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () =>
      await httpService.get<User[]>('/users').then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading)
    return (
      <div className='w-full sm:w-1/2'>
        <Skeleton height={55} />
      </div>
    );

  if (error) return null;

  return (
    <div className='w-full sm:w-1/2'>
      <label
        id='listbox-label'
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        Assigned to
      </label>
      <div className='relative mt-2'>
        <button
          type='button'
          className='relative flex w-full items-center justify-between rounded-md bg-white px-2 py-1  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-300 sm:text-sm sm:leading-6'
          onClick={() => setShowSelect((prev) => !prev)}
        >
          <span>{selectedUser?.name ?? 'Select a user'}</span>
          <BsChevronDown
            className={`${showSelect && 'rotate-180'} transition-all duration-300`}
          />
        </button>

        {showSelect && (
          <ul className='absolute z-10 mt-1 max-h-56 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {users?.map((user) => (
              <li className='relative  select-none py-2  text-gray-900'>
                <div
                  className='flex items-center justify-start gap-2 ps-2'
                  onClick={() => {
                    setShowSelect(false);
                    setSelectedUser(user);
                  }}
                >
                  <Image
                    className='rounded-full'
                    src={user.image!}
                    alt={user.name!}
                    width={25}
                    height={25}
                  />
                  <span className='ml-3 block truncate font-normal'>
                    {user.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AssigneeSelect;
