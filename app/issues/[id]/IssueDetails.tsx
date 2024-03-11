import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <div>
      <p className='text-3xl'>{issue?.title}</p>
      <div className='flex gap-3'>
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
