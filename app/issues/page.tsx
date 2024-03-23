import { IssueStatusBadge } from '@/app/components/index';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import Link from 'next/link';
import IssueStatusFilter from './_components/IssueStatusFilter';

interface Props {
  searchParams: {
    status: Status;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
  });

  return (
    <div>
      <div className='flex justify-between px-2'>
        <IssueStatusFilter />
        <Link
          className='rounded-md bg-blue-600  px-3 py-2 text-center text-white shadow-sm shadow-gray-500 transition-colors hover:bg-blue-700'
          href='/issues/new'
        >
          New Issue
        </Link>
      </div>

      <table className='my-5 w-full rounded-md border  text-left'>
        <thead className='border-b font-medium dark:border-neutral-500'>
          <tr>
            <th className='px-6 py-4'>#</th>
            <th className='px-6 py-4'>Title</th>
            <th className='px-6 py-4'>Status</th>
            <th className='px-6 py-4'>Created At</th>
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
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
