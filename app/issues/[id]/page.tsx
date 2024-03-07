import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';

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

      <p className='border-2 p-3 rounded-md border-slate-200 my-4'>{issue?.description}</p>
    </div>
  );
};

export default IssueDetails;
