import { authOptions } from '@/services/authOptions';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import AssigneeSelect from './_components/AssigneeSelect';
import DeleteIssueButton from './_components/DeleteIssueButton';
import EditIssueButton from './_components/EditIssueButton';
import IssueDetails from './_components/IssueDetails';

interface Props {
  params: {
    id: string;
  };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  })
);

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchIssue(+params.id);

  if (!issue) notFound();

  return (
    <div className='my-2 grid grid-rows-2 gap-4 px-3 sm:px-0 md:grid-cols-2 md:gap-8'>
      <div>
        <IssueDetails issue={issue} />
      </div>
      {session && (
        <div className='flex flex-col gap-5'>
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </div>
      )}
    </div>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(+params.id);

  return {
    title: issue?.title,
    description: 'Details of issue' + issue?.id,
  };
}

export default IssueDetailsPage;
