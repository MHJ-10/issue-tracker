import NextAuth from 'next-auth';
import { authOptions } from '../authOptions';

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
