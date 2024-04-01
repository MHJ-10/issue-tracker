import { Metadata } from 'next';
import RegisterForm from './RegisterForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/services/authOptions';

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect('/');

  return <RegisterForm />;
};

export default RegisterPage;

export const metadata: Metadata = {
  title: 'Issue Tracker - Register',
  description: 'user register form',
};
