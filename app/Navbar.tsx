'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBug } from 'react-icons/fa6';

interface ILink {
  label: string;
  href: string;
}

const Navbar = () => {
  const pathname = usePathname();

  console.log(pathname);

  const links: ILink[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <nav className='flex items-center space-x-10 bg-slate-200 px-3 py-5'>
      <Link href='/'>
        <FaBug size={26} />
      </Link>
      <ul className='flex gap-5'>
        {links.map((link) => (
          <li>
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
