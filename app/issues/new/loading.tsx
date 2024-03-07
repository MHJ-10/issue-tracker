import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const IssueFormLoading = () => {
  return (
    <div className='h-2/3 w-2/3'>
      <Skeleton />
    </div>
  );
};

export default IssueFormLoading;
