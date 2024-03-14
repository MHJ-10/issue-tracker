import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import Navbar from './Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} m-0 p-0`}>
        <ToastContainer
          theme='light'
          closeOnClick
          draggable
          transition={Slide}
          autoClose={3000}
          limit={2}
        />
        <Navbar />
        <main className='p-2'>{children}</main>
      </body>
    </html>
  );
}
