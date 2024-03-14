import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import EditIssueButton from '../_components/EditIssueButton';
import IssueDetails from '../_components/IssueDetails';
import DeleteIssueButton from '../_components/DeleteIssueButton';
import Dialog from '@/app/components/Dialog';

interface Props {
  params: {
    id: string;
  };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!issue) notFound();

  return (
    <div className='my-2 grid grid-rows-2 gap-4 md:grid-cols-2 md:gap-8'>
      <div>
        <IssueDetails issue={issue} />
      </div>
      <div className='flex flex-col gap-5'>
        <EditIssueButton issueId={issue.id} />
        <DeleteIssueButton issueId={issue.id} />
      </div>
    </div>
  );
};

export default IssueDetailsPage;
