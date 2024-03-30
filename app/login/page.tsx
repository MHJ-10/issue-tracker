import { Metadata } from 'next';
import LoginForm from './LoginForm';

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;

export const metadata: Metadata = {
  title: 'Issue Tracker - Login',
  description: 'user login page',
};
