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
    <table className='w-full rounded-md border text-left'>
      <thead className='border-b font-medium dark:border-neutral-500'>
        <tr>
          <th className='px-6 py-4'>#</th>
          {columns.map((column) => (
            <th key={column.value} className='px-6 py-4'>
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
        {issues.map((issue, i) => (
          <tr key={issue.id} className='border-b dark:border-neutral-500'>
            <td className='whitespace-nowrap px-6 py-4'>{i + 1}</td>
            <td className='whitespace-nowrap px-6 py-4 text-blue-900 hover:underline'>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
            </td>
            <td className='whitespace-nowrap px-6 py-4'>
              <IssueStatusBadge status={issue.status} />
            </td>
            <td className='whitespace-nowrap px-6 py-4'>
              {issue.createdAt.toDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const columns: { label: string; value: keyof Issue }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status' },
  { label: 'Created At', value: 'createdAt' },
];

export const columnValues = columns.map((column) => column.value);

export default IssuesTable;
