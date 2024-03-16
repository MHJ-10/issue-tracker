'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBug } from 'react-icons/fa6';
import { useSession } from 'next-auth/react';
import Dropdown from './components/Dropdown';
import { useState } from 'react';
import Image from 'next/image';

interface ILink {
  label: string;
  href: string;
}

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const pathname = usePathname();
  const { data, status } = useSession();

  const links: ILink[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <nav className='bg-slate-200 px-3 py-4'>
      <div className='container mx-auto flex items-center justify-between'>
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
            <Dropdown
              root={
                <button onClick={() => setShowDropdown((prev) => !prev)}>
                  <Image
                    className='inline-block h-8 w-8 rounded-full ring-2 ring-white'
                    src={data.user?.image!}
                    width={24}
                    height={24}
                    quality={75}
                    alt={data.user?.name!}
                  />
                </button>
              }
              showDropdown={showDropdown}
            >
              <div className='flex flex-col p-2 gap-2'>
                <p>{data.user?.name}</p>
                <p>{data.user?.email}</p>
                <Link className='pt-2 border-t border-slate-200' href='/api/auth/signout'>Logout</Link>
              </div>
            </Dropdown>
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
