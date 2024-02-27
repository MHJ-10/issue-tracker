import Link from 'next/link';

const IssuesPage = () => {
  return (
    <div>
      <Link className='btn-blue' href='/issues/new'>
        New Issue Page
      </Link>
    </div>
  );
};

export default IssuesPage;
