'use client';

import { httpService } from '@/services/httpService';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiTrash } from 'react-icons/hi2';
import { toast } from 'react-toastify';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await toast.promise(
      httpService.delete(`/issues/${issueId}`),
      {
        pending: 'Deleting issue...',
        success: {
          render({ data }) {
            if (data.status === 200) {
              setTimeout(() => router.push('/issues'), 2000);
              return 'Issue deleted successfully';
            }
          },
        },
        error: 'Failed to delete issue',
      }
    );

    console.log(response);
  };
  return (
    <button
      className='flex w-32 items-center justify-center gap-2 rounded-md bg-red-500 px-3 py-2 text-white transition-colors duration-500 hover:bg-red-600'
      onClick={handleDelete}
    >
      <HiTrash />
      Delete
    </button>
  );
};

export default DeleteIssueButton;
