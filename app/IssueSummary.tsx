import { Status } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const statuses: {
    label: string;
    status: Status;
    color: string;
    value: number;
  }[] = [
    { label: 'Open', status: 'OPEN', color: 'red', value: open },
    {
      label: 'In Progress',
      status: 'IN_PROGRESS',
      color: 'blue',
      value: inProgress,
    },
    { label: 'Closed', status: 'CLOSE', color: 'green', value: closed },
  ];

  return (
    <div className='flex w-full  flex-col items-center justify-start gap-5 sm:flex-row'>
      {statuses.map((status) => (
        <div
          key={status.label}
          className={`flex h-40 w-3/4 flex-col items-center justify-center gap-2 rounded-md border-2 sm:w-1/3 border-${status.color}-300 bg-${status.color}-200 `}
        >
          <Link
            className='lato text-center text-lg font-bold'
            href={`/issues?status=${status.status}`}
          >
            {status.label} Issues
          </Link>
          <div
            className={`mx-auto flex size-20 bg-${status.color}-300 items-center justify-center rounded-full border-8 border-${status.color}-500 text-xl font-bold`}
          >
            {status.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IssueSummary;
