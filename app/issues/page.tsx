import prisma from '@/prisma/client';
import Link from 'next/link';
import IssueStatusBadge from '../components/IssueStatusBadge';
import delay from 'delay';

const IssuesPage = async () => {
  await delay(2000);
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <Link className='btn-blue' href='/issues/new'>
        New Issue Page
      </Link>

      <table className='my-10 w-full rounded-md border  text-left'>
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
            <tr className='border-b dark:border-neutral-500'>
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

export default IssuesPage;
