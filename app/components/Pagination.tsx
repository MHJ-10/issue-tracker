'use client';

import { useRouter } from 'next/navigation';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';

interface Props {
  pageSize: number;
  itemCount: number;
  currentPage: number;
}

const Pagination = ({ itemCount, currentPage, pageSize }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  const router = useRouter();

  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    router.push('?' + params.toString());
  };

  return (
    <div className='flex items-center justify-between bg-white px-4 py-3 sm:px-6'>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>{`page ${currentPage} of ${pageCount}`}</div>
        <div>
          <nav className='isolate inline-flex -space-x-px rounded-md shadow-sm'>
            <button
              className='pagination-btn rounded-l-md'
              disabled={currentPage === 1}
              onClick={() => changePage(1)}
            >
              <FiChevronsLeft />
            </button>
            <button
              className='pagination-btn'
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
            >
              <FiChevronLeft />
            </button>

            <button
              className='pagination-btn'
              disabled={currentPage === pageCount}
              onClick={() => changePage(currentPage + 1)}
            >
              <FiChevronRight />
            </button>
            <button
              className='pagination-btn rounded-r-md'
              disabled={currentPage === pageCount}
              onClick={() => changePage(pageCount)}
            >
              <FiChevronsRight />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

{
  /* <a
              href='#'
              className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            >
              10
            </a> */
}
