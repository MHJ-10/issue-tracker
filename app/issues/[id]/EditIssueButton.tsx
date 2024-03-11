import Link from 'next/link';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <button className='flex items-center gap-2 rounded-md bg-blue-800 px-3 py-2 text-white'>
      <HiOutlinePencilSquare />
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </button>
  );
};

export default EditIssueButton;
