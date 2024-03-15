'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBug } from 'react-icons/fa6';
import { useSession } from 'next-auth/react';

interface ILink {
  label: string;
  href: string;
}

const Navbar = () => {
  const pathname = usePathname();
  const { status } = useSession();
  const isAuth = status === 'authenticated';

  const links: ILink[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
    {
      label: `${isAuth ? 'Logout' : 'Login'}`,
      href: `/api/auth/${isAuth ? 'signout' : 'signin'}`,
    },
  ];

  return (
    <nav className='flex items-center space-x-10 bg-slate-200 px-3 py-5'>
      <Link href='/'>
        <FaBug size={26} />
      </Link>
      <ul className='flex gap-5'>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={`${link.href === pathname && 'text-zinc-950 underline underline-offset-2'} text-zinc-600`}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
