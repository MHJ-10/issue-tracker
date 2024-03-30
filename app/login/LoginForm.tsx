'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../validationSchema';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: User ) => {
    const response = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: '/',
    });

    console.log(response);
  };
  return (
    <form
      className='mx-auto flex w-full flex-col justify-center rounded-md border border-slate-200 p-2 sm:w-3/4 md:w-2/3 '
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className='my-2 text-center text-2xl font-bold uppercase'>
        Login Form
      </p>

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

      <button
        type='submit'
        className='mx-auto inline-block w-2/3 rounded bg-blue-600  py-3 text-center text-sm font-medium uppercase  text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg sm:w-1/3'
      >
        Login
      </button>

      <p className='mx-auto mt-2'>
        Are you a new user?
        <Link
          className='ms-1 text-blue-500 underline underline-offset-2 transition-colors hover:text-blue-600'
          href='/register'
        >
          Create an account!
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;