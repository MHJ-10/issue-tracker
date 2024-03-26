import { IssueStatusBadge } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { FaArrowUpLong } from 'react-icons/fa6';

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssuesTable = ({ searchParams, issues }: Props) => {
  return (
    <table className='mx-auto w-full rounded-md border text-left'>
      <thead className='border-b font-medium dark:border-neutral-500'>
        <tr>
          {columns.map((column) => (
            <th key={column.value} className={`px-3 py-4 ${column.className}`}>
              <Link
                href={{
                  query: { ...searchParams, orderBy: column.value },
                }}
              >
                {column.label}
                {column.value === searchParams.orderBy && (
                  <FaArrowUpLong className='mb-1 inline' />
                )}
              </Link>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {issues.map((issue) => (
          <tr key={issue.id} className='border-b dark:border-neutral-500'>
            <td className='whitespace-nowrap text-wrap px-3 py-4 text-blue-900 hover:underline'>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
            </td>
            <td className='hidden whitespace-nowrap px-3 py-4 sm:table-cell'>
              <IssueStatusBadge status={issue.status} />
            </td>
            <td className='hidden whitespace-nowrap px-3 py-4 md:table-cell'>
              {issue.createdAt.toDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const columns: { label: string; value: keyof Issue; className: string }[] = [
  { label: 'Issue', value: 'title', className: '' },
  { label: 'Status', value: 'status', className: 'hidden sm:table-cell' },
  {
    label: 'Created At',
    value: 'createdAt',
    className: 'hidden md:table-cell',
  },
];

export const columnValues = columns.map((column) => column.value);

export default IssuesTable;
