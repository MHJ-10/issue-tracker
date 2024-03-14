'use client';

import Dialog from '@/app/components/Dialog';
import { httpService } from '@/services/httpService';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiTrash } from 'react-icons/hi2';
import { toast } from 'react-toastify';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async () => {
    setShowDialog(false);
    const response = await toast.promise(
      httpService.delete(`/issues/${issueId}`),
      {
        pending: 'Deleting issue...',
        success: {
          render({ data }) {
            if (data.status === 200) {
              setTimeout(() => {
                router.push('/issues');
                router.refresh();
              }, 2000);
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
    <div>
      <button
        className='issue-btn bg-red-500 text-white hover:bg-red-600'
        onClick={() => setShowDialog(true)}
      >
        <HiTrash />
        Delete
      </button>

      <Dialog showDialog={showDialog}>
        <div>
          <h1 className='border-b border-slate-300 pb-2 text-xl'>
            Delete Issue
          </h1>
          <p className='py-3'>Are you sure you want to delete this issue?</p>
          <div className='flex justify-end gap-5'>
            <button
              className='dialog-btn bg-slate-100 text-black hover:bg-slate-200'
              onClick={() => setShowDialog(false)}
            >
              Cancel
            </button>
            <button
              className='dialog-btn bg-red-500 text-white hover:bg-red-600'
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteIssueButton;
