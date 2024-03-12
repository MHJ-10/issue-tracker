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
    <div className='mx-auto grid w-2/3 grid-cols-3 rounded-md border-2 border-slate-400'>
      <div className='col-span-1 flex flex-col items-center justify-center rounded-l-md bg-blue-400'>
        <Image
          className='transition-all duration-700 ease-in-out hover:translate-y-2 hover:scale-110'
          src={bugImage}
          alt='bug'
          priority
        />
      </div>
      <form
        className='col-span-2 flex flex-col items-center justify-center gap-10 rounded-r-md bg-blue-600 bg-opacity-20 py-8'
        onSubmit={handleSubmit(onSumbit)}
      >
        <p className='text-2xl font-bold uppercase'>Issue Form</p>
        <div className='flex w-3/4 flex-row justify-between'>
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

        <div className='flex w-3/4 justify-between'>
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

        <button className='btn-blue'>
          {issue ? 'Update Issue' : 'Create Issue'}
        </button>
      </form>
    </div>
  );
};

export default IssueForm;
