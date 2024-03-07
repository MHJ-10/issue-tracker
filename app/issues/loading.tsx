import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const IssuesPageLoading = () => {
  const issues: number[] = [1, 2, 3, 4, 5, 6];

  return (
    <table className='my-10 w-full rounded-md border  text-left'>
      <thead className='border-b font-medium dark:border-neutral-500'>
        {issues.map((issue) => (
          <tr>
            <th className='px-6 py-4'>
              <Skeleton />
            </th>
          </tr>
        ))}
      </thead>
      <tbody>
        {issues.map((issue, i) => (
          <tr className='border-b dark:border-neutral-500'>
            <td className='whitespace-nowrap px-6 py-4'>
              <Skeleton />
            </td>
            <td className='whitespace-nowrap px-6 py-4 text-blue-900 hover:underline'>
              <Skeleton />
            </td>
            <td className='whitespace-nowrap px-6 py-4'>
              <Skeleton />
            </td>
            <td className='whitespace-nowrap px-6 py-4'>
              <Skeleton />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IssuesPageLoading;
