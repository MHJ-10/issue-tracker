import { Skeleton } from '@/app/components/index';

const IssuesPageLoading = () => {
  return (
    <table className='my-10 w-full rounded-md border text-left'>
      <thead className='border-b border-gray-300 font-medium'>
        <tr>
          {[1, 2, 3, 4].map((number) => (
            <th key={number} className='px-6 py-4'>
              <Skeleton />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3, 4, 5, 6].map((number) => (
          <tr key={number} className='border-b border-gray-300'>
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
