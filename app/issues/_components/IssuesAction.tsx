import React from 'react';
import IssueStatusFilter from './IssueStatusFilter';
import Link from 'next/link';

const IssuesAction = () => {
  return (
    <div className='flex items-center justify-between px-px'>
      <div className='w-3/4 sm:w-1/2 lg:w-1/3'>
        <IssueStatusFilter />
      </div>
      <Link
        className='rounded-md bg-blue-600 px-1 py-1 text-center text-white shadow-sm shadow-gray-500 transition-colors hover:bg-blue-700 sm:px-3 sm:py-2'
        href='/issues/new'
      >
        New Issue
      </Link>
    </div>
  );
};

export default IssuesAction;
