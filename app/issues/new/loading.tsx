import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const IssueFormLoading = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Skeleton width='70vw' height='70vh' />
    </div>
  );
};

export default IssueFormLoading;
