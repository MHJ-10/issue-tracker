'use client';

import { Select, Skeleton, UserAvatar } from '@/app/components';
import { httpService } from '@/services/httpService';
import { Issue, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, isLoading, error } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>();
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const router = useRouter();

  const defaultUser = users?.find((user) => user.id === issue.assignedToUserId);

  if (isLoading)
    return (
      <div className='w-full sm:w-4/5 lg:w-3/5'>
        <Skeleton height={55} />
      </div>
    );

  if (error) return null;

  const assignIssue = async (user: User) => {
    const res = await toast.promise(
      httpService.patch(`/issues/${issue.id}`, {
        assignedToUserId: user?.id,
      }),
      {
        pending: 'assigning',
        success: {
          render() {
            setSelectedUser(user);
            setShowSelect(false);
            router.refresh();
            return 'assigned issue';
          },
        },
        error: 'failed to assigning issue',
      }
    );
    console.log(res);
  };

  return (
    <div className='w-full sm:w-4/5 lg:w-3/5'>
      <label className='block text-sm font-medium leading-6 text-gray-900'>
        Assigned To
      </label>
      <Select
        onClose={() => setShowSelect(false)}
        placeholder={
          selectedUser?.name ?? (defaultUser?.name || 'Select a user')
        }
        showSelect={showSelect}
        onClick={() => setShowSelect((prev) => !prev)}
      >
        {users?.map((user) => (
          <li
            key={user.id}
            className='relative select-none py-2 text-gray-900 transition duration-200 ease-in-out hover:bg-slate-200'
          >
            <div
              className='flex items-center justify-start gap-2 ps-2'
              onClick={() => assignIssue(user)}
            >
              <UserAvatar name={user.name!} imageUrl={user.image!} />
              <span className='ml-3 block truncate font-normal'>
                {user.name}
              </span>
            </div>
          </li>
        ))}
      </Select>
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
