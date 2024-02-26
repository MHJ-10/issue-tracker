'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ILink {
  label: string;
  href: string;
}

const Navbar = () => {
  const pathname = usePathname();

  console.log(pathname);

  const links: ILink[] = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <nav className='flex items-center space-x-10 bg-slate-200 px-3 py-5'>
      <Link href='/'>Logo</Link>
      <ul className='flex gap-5'>
        {links.map((link) => (
          <li>
            <Link
              className={`${link.href === pathname && 'text-zinc-800 underline underline-offset-2'} text-zinc-500`}
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
