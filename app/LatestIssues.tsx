import prisma from '@/prisma/client';
import Link from 'next/link';
import { IssueStatusBadge } from './components';
import Image from 'next/image';

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { assingedToUser: true },
  });

  return (
    <div className='rounded-md border border-slate-300 mx-1'>
      <p className='p-2 text-2xl font-bold'>Latest Issues</p>
      {issues.map((issue) => (
        <div
          className='my-2 flex items-center justify-between border-b border-slate-200 px-2 py-1'
          key={issue.id}
        >
          <div className='flex flex-col items-start gap-2'>
            <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
            <IssueStatusBadge status={issue.status} />
          </div>
          {issue.assingedToUser && (
            <Image
              className='size-10 rounded-full'
              src={issue.assingedToUser?.image!}
              alt={issue.title}
              width={25}
              height={25}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default LatestIssues;
