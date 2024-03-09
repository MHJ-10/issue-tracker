import { Skeleton } from '@/app/components/index';

const IssueFormLoading = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Skeleton width='70vw' height='70vh' />
    </div>
  );
};

export default IssueFormLoading;
