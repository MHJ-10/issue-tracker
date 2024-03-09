import { Skeleton } from '@/app/components/index';

const IssuesPageLoading = () => {
  return (
    <table className='my-10 w-full rounded-md border text-left'>
      <thead className='border-b font-medium dark:border-neutral-500'>
        <tr>
          {[1, 2, 3, 4].map((number) => (
            <th className='px-6 py-4'>
              <Skeleton />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3, 4, 5, 6].map((number) => (
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
