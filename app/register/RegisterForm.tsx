'use client';

import { httpService } from '@/services/httpService';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { registerSchema } from '../validationSchema';
import { User } from '@prisma/client';

interface FormData extends User {
  confirmPassword: string;
}

const RegisterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: FormData) => {
    const response = await toast.promise(httpService.post('/register', data), {
      pending: 'Registering User...',
      success: {
        render({ data }) {
          if (data.status === 201) {
            setTimeout(() => signIn(undefined, { callbackUrl: '/' }), 2000);
            return 'User registration is done';
          }
        },
      },
      error: 'User registration failed',
    });

    console.log(response);
  };
  return (
    <form
      className='mx-auto flex w-full flex-col justify-center rounded-md border border-slate-200 p-2 sm:w-3/4 md:w-2/3 '
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className='my-2 text-center text-2xl font-bold uppercase'>
        Signup Form
      </p>
      <div className='mb-5'>
        <input
          placeholder='Name'
          className={`form-input ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          type='text'
          {...register('name')}
        />
        <p className='text-red-500'>{errors.name?.message}</p>
      </div>
      <div className='mb-5'>
        <input
          placeholder='Email address'
          className={`form-input ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          type='text'
          {...register('email')}
        />
        <p className='text-red-500'>{errors.email?.message}</p>
      </div>
      <div className='mb-5'>
        <input
          placeholder='Password'
          className={`form-input ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          type='password'
          {...register('password')}
        />
        <p className='text-red-500'>{errors.password?.message}</p>
      </div>
      <div className='mb-5'>
        <input
          placeholder='Confirm Password'
          className={`form-input ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
          type='password'
          {...register('confirmPassword')}
        />
        <p className='text-red-500'>{errors.confirmPassword?.message}</p>
      </div>
      <button
        type='submit'
        className='mx-auto inline-block w-2/3 rounded bg-blue-600  py-3 text-center text-sm font-medium uppercase  text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg sm:w-1/3'
      >
        Sign up
      </button>

      <p className='mx-auto mt-2'>
        Already have an account?
        <Link
          className='ms-1 text-blue-500 underline underline-offset-2 transition-colors hover:text-blue-600'
          href='/login'
        >
          Login here!
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
