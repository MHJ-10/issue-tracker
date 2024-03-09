import { Skeleton } from '@/app/components/index';

const LoadingIssueDetailPage = () => {
  return (
    <div className='max-w-xl'>
      <p className='text-3xl'>
        <Skeleton />
      </p>

      <div className='my-3 flex gap-3'>
        <Skeleton />
      </div>

      <p className='my-4 rounded-md border-2 border-slate-200 p-3'>
        <Skeleton count={3} />
      </p>
    </div>
  );
};

export default LoadingIssueDetailPage;
