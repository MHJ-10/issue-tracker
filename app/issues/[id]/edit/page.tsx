import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import IssueForm from '../../_components/IssueForm';

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

const EditIssuePage = async ({ params }: Props) => {
  const issue = await fetchIssue(+params.id);

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(+params.id);

  return {
    title: `Issue Tracker - Edit Issue ${issue?.id}`,
    description: `Edit details of issue ${issue?.id}`,
  };
}

export default EditIssuePage;
