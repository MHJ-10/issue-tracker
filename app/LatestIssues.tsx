import prisma from '@/prisma/client';
import Link from 'next/link';
import { IssueStatusBadge, UserAvatar } from './components';

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { assingedToUser: true },
  });

  return (
    <div className='mx-1 rounded-md border border-slate-300'>
      <p className='lato p-2 text-2xl'>Latest Issues</p>
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
            <UserAvatar
              name={issue.assingedToUser.name!}
              imageUrl={issue.assingedToUser.image!}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default LatestIssues;
