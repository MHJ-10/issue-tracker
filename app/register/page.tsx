import { Metadata } from 'next';
import RegisterForm from './RegisterForm';

const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;

export const metadata: Metadata = {
  title: 'Issue Tracker - Register',
  description: 'user register form',
};
