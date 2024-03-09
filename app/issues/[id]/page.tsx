import { IssueStatusBadge } from '@/app/components/index';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

const IssueDetails = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!issue) notFound();

  return (
    <div>
      <p className='text-3xl'>{issue?.title}</p>

      <div className='my-3 flex gap-3'>
        <IssueStatusBadge status={issue.status} />
        <p>{issue?.createdAt.toDateString()}</p>
      </div>

      <p className='my-4 rounded-md border-2 border-slate-200 p-3'>
        {issue?.description}
      </p>
    </div>
  );
};

export default IssueDetails;
