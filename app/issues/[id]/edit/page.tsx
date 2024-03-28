import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import IssueForm from '../../_components/IssueForm';
import { Metadata } from 'next';

interface Props {
  params: {
    id: string;
  };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: +params.id,
    },
  });

  return {
    title: `Issue Tracker - Edit Issue ${issue?.id}`,
    description: `Edit details of issue ${issue?.id}`,
  };
}

export default EditIssuePage;

