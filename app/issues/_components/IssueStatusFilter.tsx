'use client';

import { Select } from '@/app/components';
import { Status } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface IssueStatusFilter {
  label: string;
  status?: Status;
}

const statuses: IssueStatusFilter[] = [
  { label: 'All' },
  { label: 'Open', status: 'OPEN' },
  { label: 'In Progress', status: 'IN_PROGRESS' },
  { label: 'Close', status: 'CLOSE' },
];

const IssueStatusFilter = () => {
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const router = useRouter();

  const addQuery = (status: IssueStatusFilter) => {
    const query = status.status ? `?status=${status.status}` : '';
    router.push(`/issues/${query}`);
    setShowSelect(false);
  };

  return (
    <div className='flex w-1/2 items-center justify-start gap-2'>
      <label className='mt-1 block text-sm font-medium leading-6 text-gray-900'>
        Filter by status :
      </label>
      <div className='w-1/2'>
        <Select
          placeholder='select a status'
          showSelect={showSelect}
          onClick={() => setShowSelect((prev) => !prev)}
        >
          {statuses.map((status) => (
            <li
              className='relative  select-none py-2 text-gray-900 transition duration-200 ease-in-out hover:bg-slate-200'
              onClick={() => addQuery(status)}
            >
              <span className='ps-2'>{status.label}</span>
            </li>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default IssueStatusFilter;
