import IssueChart from './IssueChart';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import prisma from '@/prisma/client';

const Home = async () => {
  const open = await prisma.issue.count({
    where: {
      status: 'OPEN',
    },
  });

  const inProgress = await prisma.issue.count({
    where: {
      status: 'IN_PROGRESS',
    },
  });

  const closed = await prisma.issue.count({
    where: {
      status: 'CLOSE',
    },
  });
  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='flex flex-col items-center justify-center gap-6'>
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </div>
      <LatestIssues />
    </div>
  );
};

export default Home;
