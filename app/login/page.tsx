import { Metadata } from 'next';
import LoginForm from './LoginForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/services/authOptions';

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect('/');

  return <LoginForm />;
};

export default LoginPage;

export const metadata: Metadata = {
  title: 'Issue Tracker - Login',
  description: 'user login page',
};
