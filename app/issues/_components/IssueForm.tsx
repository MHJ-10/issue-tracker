'use client';

import { issueSchema } from '@/app/validationSchema';
import bugImage from '@/public/images/colorful-bug.png';
import { httpService } from '@/services/httpService';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Issue>({ resolver: zodResolver(issueSchema) });
  const router = useRouter();

  const onSumbit = async (data: Issue) => {
    const response = await toast.promise(
      issue
        ? httpService.patch(`/issues/${issue.id}`, data)
        : httpService.post('/issues', data),
      {
        pending: `${issue ? 'update' : 'send'} issue...`,
        success: {
          render({ data }) {
            if (data.status === 201) {
              setTimeout(() => {
                router.push('/issues');
                router.refresh();
              }, 3000);
              return `${issue ? 'update' : 'send'} issue successfully`;
            }
          },
        },
        error: `failed to ${issue ? 'update' : 'send'} issue`,
      }
    );

    console.log(response);
  };

  return (
    <form
      className='col-span-2 mx-auto flex w-full flex-col items-center justify-center gap-5 rounded-md rounded-r-md border border-slate-200 bg-slate-300 py-3 sm:w-2/3 lg:w-3/5'
      onSubmit={handleSubmit(onSumbit)}
    >
      <Image
        src={bugImage}
        alt='bug'
        width={90}
        height={90}
        className='size-32 rounded-full border border-slate-400 bg-slate-200 p-1 shadow-md shadow-gray-400 transition-transform duration-500 hover:translate-y-2 hover:scale-110'
      />
      <p className='lato text-2xl font-bold normal-case'>Issue Form</p>
      <div className='flex w-full justify-between px-2 sm:w-3/4'>
        <label htmlFor='title'>Title:</label>
        <div className='flex w-3/4 flex-col gap-2'>
          <input
            id='title'
            className={`w-3/3 rounded-md border-2 ${errors.title ? 'border-red-500' : 'border-blue-400'} border-blue-400 px-1 outline-none transition-colors duration-500  focus:border-blue-600`}
            defaultValue={issue?.title}
            type='text'
            {...register('title')}
          />
          <p className='text-red-500'>{errors.title?.message}</p>
        </div>
      </div>

      <div className='flex w-full justify-between px-2 sm:w-3/4'>
        <label htmlFor='description'>Description:</label>
        <div className='flex w-3/4 flex-col gap-2'>
          <textarea
            id='description'
            className={`w-3/3 rounded-md border-2 ${errors.description ? 'border-red-500' : 'border-blue-400'} border-blue-400 px-1 outline-none transition-colors duration-500  focus:border-blue-600`}
            defaultValue={issue?.description}
            rows={3}
            {...register('description')}
          />
          <p className='text-red-500'>{errors.description?.message}</p>
        </div>
      </div>

      <button className='rounded-md bg-blue-600 px-3 py-2 text-white ring-2 ring-blue-700 transition-colors duration-300 hover:bg-blue-700 hover:ring-blue-600'>
        {issue ? 'Update Issue' : 'Create Issue'}
      </button>
    </form>
  );
};

export default IssueForm;
