import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import { Pagination } from '../components';
import IssuesAction from './_components/IssuesAction';
import IssuesTable, {
  columnValues,
  IssueQuery,
} from './_components/IssuesTable';
import { Metadata } from 'next';

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const sortBy = columnValues.includes(searchParams.sortBy)
    ? {
        [searchParams.sortBy]: searchParams.orderBy,
      }
    : undefined;

  const pageSize = 10;
  const currentPage = +searchParams.page || 1;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy: sortBy,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const pageCount = await prisma.issue.count({
    where: {
      status,
    },
  });

  return (
    <div className='flex flex-col gap-4'>
      <IssuesAction />
      <IssuesTable issues={issues} searchParams={searchParams} />
      <Pagination
        itemCount={pageCount}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues',
};
