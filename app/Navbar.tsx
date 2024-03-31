'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaBug } from 'react-icons/fa6';
import { Dropdown, Skeleton, UserAvatar } from './components';

interface ILink {
  label: string;
  href: string;
}

const Navbar = () => {
  return (
    <nav className='bg-slate-200 px-3 py-4'>
      <div className='container mx-auto flex items-center justify-between'>
        <NavLinks />
        <AuthDropdown />
      </div>
    </nav>
  );
};

const NavLinks = () => {
  const pathname = usePathname();

  const links: ILink[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
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
  );
};

const AuthDropdown = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { data, status } = useSession();

  if (status === 'loading')
    return (
      <Skeleton
        circle
        baseColor='rgb(82 82 91 /1);'
        width='1.75rem'
        height='1.75rem'
      />
    );

  if (status === 'unauthenticated')
    return (
      <Link className='text-zinc-600' href='/api/auth/signin'>
        Login
      </Link>
    );

  return (
    <Dropdown
      root={
        <button onClick={() => setShowDropdown((prev) => !prev)}>
          <UserAvatar name={data?.user?.name!} imageUrl={data?.user?.image!} />
        </button>
      }
      showDropdown={showDropdown}
    >
      <div className='flex flex-col gap-2 p-2'>
        <p>{data!.user?.name}</p>
        <p>{data!.user?.email}</p>
        <Link
          className='border-t border-slate-200 pt-2'
          href='/api/auth/signout'
        >
          Logout
        </Link>
      </div>
    </Dropdown>
  );
};

export default Navbar;
