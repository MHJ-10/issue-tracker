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
    <div>
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
    </div>
  );
};

export default Home;
