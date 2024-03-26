import React from 'react';
import IssueStatusFilter from './IssueStatusFilter';
import Link from 'next/link';

const IssuesAction = () => {
  return (
    <div className='flex justify-between'>
      <IssueStatusFilter />
      <Link
        className='rounded-md bg-blue-600 px-3 py-2 text-center text-white shadow-sm shadow-gray-500 transition-colors hover:bg-blue-700'
        href='/issues/new'
      >
        New Issue
      </Link>
    </div>
  );
};

export default IssuesAction;
