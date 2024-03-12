import Link from 'next/link';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <button className='flex w-32 items-center justify-center gap-2 rounded-md  bg-blue-600 px-3 py-2 text-white transition-colors duration-500 hover:bg-blue-700'>
      <HiOutlinePencilSquare />
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </button>
  );
};

export default EditIssueButton;
