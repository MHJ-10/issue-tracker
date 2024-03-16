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

  const links: ILink[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <nav className='bg-slate-200 px-3 py-5'>
      <div className='flex items-center justify-between container mx-auto'>
        <div className='flex items-center justify-start gap-7'>
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
        </div>
        <div>
          {status === 'authenticated' && (
            <Link href='/api/auth/signout'>Logout</Link>
          )}
          {status === 'unauthenticated' && (
            <Link href='/api/auth/sigin'>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
