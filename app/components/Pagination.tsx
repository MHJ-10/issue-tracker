'use client';

import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Props {
  pageSize: number;
  itemCount: number;
  currentPage: number;
}

const Pagination = ({ itemCount, currentPage, pageSize }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();

  if (pageCount <= 1) return null;

  if (+searchParams.get('page')! > pageCount) notFound();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push('?' + params.toString());
  };

  const renderPaginationButtons = () => {
    const paginateButtons = [];

    for (let i = 1; i <= pageCount; i++) {
      paginateButtons.push(
        <button
          key={i}
          className={`pagination-btn ${i === currentPage && 'bg-indigo-600 text-white hover:bg-indigo-700'} `}
          onClick={() => changePage(i)}
        >
          {i}
        </button>
      );
    }

    return paginateButtons;
  };

  return (
    <div className='flex items-center justify-center'>
      <div className=' flex flex-1 items-center justify-center gap-5 sm:justify-start'>
        <div className='hidden sm:flex'>{`page ${currentPage} of ${pageCount}`}</div>
        <div>
          <nav className='inline-flex rounded-md shadow-sm'>
            <button
              className='pagination-btn rounded-l-md'
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
            >
              <FiChevronLeft />
            </button>

            {renderPaginationButtons()}

            <button
              className='pagination-btn rounded-r-md'
              disabled={currentPage === pageCount}
              onClick={() => changePage(currentPage + 1)}
            >
              <FiChevronRight />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
