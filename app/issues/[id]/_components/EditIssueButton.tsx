import Link from 'next/link';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <button className='issue-btn bg-blue-600 text-white hover:bg-blue-700'>
      <HiOutlinePencilSquare />
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </button>
  );
};

export default EditIssueButton;
