import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await prisma.user.findMany({ orderBy: { name: 'asc' } });

  if (!users)
    return NextResponse.json({ message: 'users not found' }, { status: 404 });

  return NextResponse.json(users, { status: 200 });
}
