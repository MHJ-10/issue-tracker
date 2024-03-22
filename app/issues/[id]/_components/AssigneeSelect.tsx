'use client';

import { Skeleton } from '@/app/components';
import { httpService } from '@/services/httpService';
import { Issue, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { toast } from 'react-toastify';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, isLoading, error } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>();
  const [showSelect, setShowSelect] = useState<boolean>(false);

  const defaultUser = users?.find((user) => user.id === issue.assignedToUserId);

  if (isLoading)
    return (
      <div className='w-full sm:w-1/2'>
        <Skeleton height={55} />
      </div>
    );

  if (error) return null;

  const assignIssue = async () => {
    if (selectedUser) {
      await toast.promise(
        httpService.patch(`/issues/${issue.id}`, {
          assignedToUserId: selectedUser?.id,
        }),
        {
          pending: 'assigning',
          success: {
            render() {
              setSelectedUser(null);
              return 'assigned issue';
            },
          },
          error: 'failed to assigning issue',
        }
      );
    }
  };

  return (
    <div className='w-full sm:w-4/5 lg:w-3/5'>
      <label
        id='listbox-label'
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        Assigned to
      </label>
      <div className='relative mt-2 flex flex-row gap-1'>
        <div
          className='relative flex w-4/5  items-center justify-between rounded-md bg-white px-2 py-1  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-300 sm:text-sm sm:leading-6'
          onClick={() => setShowSelect((prev) => !prev)}
        >
          <span>
            {selectedUser?.name ?? (defaultUser?.name || 'Select a user')}
          </span>
          <BsChevronDown
            className={`${showSelect && 'rotate-180'} transition-all duration-300`}
          />
        </div>
        <button
          className='rounded-md bg-slate-600 px-2 py-0 text-sm text-white ring-1 ring-slate-400 transition-all duration-500 ease-in-out hover:bg-slate-700 disabled:opacity-70'
          disabled={!selectedUser || selectedUser === defaultUser}
          onClick={assignIssue}
        >
          Assign
        </button>
        {showSelect && (
          <ul className='absolute z-10 mt-8 max-h-56 w-full divide-y divide-slate-300 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {users?.map((user) => (
              <li className='relative  select-none py-2 text-gray-900'>
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

const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () =>
      await httpService.get<User[]>('/users').then((res) => res.data),
    staleTime: 60 * 60 * 1000, //1 hour
    retry: 3,
  });
};

export default AssigneeSelect;
