import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

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
    <div className='my-2 grid grid-cols-2 gap-8'>
      <div>
        <IssueDetails issue={issue} />
      </div>
      <div>
        <EditIssueButton issueId={issue.id} />
      </div>
    </div>
  );
};

export default IssueDetailsPage;
