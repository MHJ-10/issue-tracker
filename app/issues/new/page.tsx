'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import bugImage from '@/public/images/colorful-bug.png';

const NewIssuePage = () => {
  const [issueInfo, setIssueinfo] = useState({
    title: '',
    description: '',
  });

  const handleIssue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIssueinfo((prev) => {
      return {
        ...prev,
        [event.target.id]: event.target.value,
      };
    });
  };


  return (
    <div className='grid grid-cols-3 rounded-md border-2 border-slate-400'>
      <div className='col-span-1 flex flex-col items-center justify-center rounded-l-md bg-blue-600'>
        <Image src={bugImage} alt='bug' priority />
      </div>
      <form
        className='col-span-2 flex flex-col items-center justify-center gap-10 rounded-r-md bg-blue-600 bg-opacity-20 py-8'
        action=''
      >
        <p className='text-2xl font-bold '>Add Issue Form</p>
        <div className='flex w-3/4 justify-between'>
          <label htmlFor='title'>Title:</label>
          <input
            id='title'
            className='w-2/3 rounded-md border-2  border-blue-400 px-1 outline-none transition-colors duration-500  focus:border-blue-600'
            type='text'
            onChange={(e) => handleIssue(e)}
          />
        </div>

        <div className='flex w-3/4  justify-between'>
          <label htmlFor='description'>Description:</label>
          <textarea
            id='description'
            className='w-2/3 rounded-md border-2  border-blue-400 px-1 outline-none transition-colors duration-500  focus:border-blue-600'
            rows={3}
            onChange={(e) => handleIssue(e)}
          />
        </div>

        <button className='btn-blue'>Create</button>
      </form>
    </div>
  );
};

export default NewIssuePage;
