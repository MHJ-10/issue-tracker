import { IssueStatusBadge } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import Link from 'next/link';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

export interface IssueQuery {
  status: Status;
  sortBy: keyof Issue;
  orderBy: 'asc' | 'desc';
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssuesTable = ({ searchParams, issues }: Props) => {
  return (
    <table className='mx-auto w-full rounded-md border text-left'>
      <thead className='lato border-b border-gray-300 font-medium'>
        <tr>
          {columns.map((column) => (
            <th key={column.value} className={`px-3 py-4 ${column.className}`}>
              <Link
                className='flex items-center gap-2'
                href={{
                  query: {
                    ...searchParams,
                    page: searchParams.page,
                    sortBy:
                      searchParams.orderBy === 'desc' &&
                      column.value === searchParams.sortBy
                        ? undefined
                        : column.value,
                    orderBy:
                      column.value !== searchParams.sortBy
                        ? 'asc'
                        : searchParams.orderBy === 'desc'
                          ? undefined
                          : 'desc',
                  },
                }}
              >
                {column.label}
                <div className='flex flex-col'>
                  <TiArrowSortedUp
                    className={`${column.value === searchParams.sortBy && searchParams.orderBy === 'asc' ? 'text-blue-700' : 'text-black'}`}
                  />
                  <TiArrowSortedDown
                    className={`${column.value === searchParams.sortBy && searchParams.orderBy === 'desc' ? 'text-blue-700' : 'text-black'}`}
                  />
                </div>
              </Link>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {issues.map((issue) => (
          <tr key={issue.id} className='border-b border-gray-300'>
            <td className='w-3/6 whitespace-nowrap text-wrap  px-3 py-4 text-blue-900 hover:underline'>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
            </td>
            <td className='hidden w-1/6 whitespace-nowrap  px-3 py-4 sm:table-cell'>
              <IssueStatusBadge status={issue.status} />
            </td>
            <td className='hidden w-2/6 whitespace-nowrap px-3 py-4 md:table-cell'>
              {issue.createdAt.toDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const columns: { label: string; value: keyof Issue; className: string }[] = [
  { label: 'Issue', value: 'title', className: '' },
  { label: 'Status', value: 'status', className: 'hidden sm:table-cell' },
  {
    label: 'Created At',
    value: 'createdAt',
    className: 'hidden md:table-cell',
  },
];

export const columnValues = columns.map((column) => column.value);

export default IssuesTable;
