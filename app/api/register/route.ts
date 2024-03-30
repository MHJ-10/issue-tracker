import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import prisma from '@/prisma/client';
import { registerSchema } from '@/app/validationSchema';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    name: string;
    email: string;
    password: string;
  };
  const hashedPassword = await hash(body.password, 12);

  const user = await prisma.user.findFirst({
    where: {
      email: body.email.toLocaleLowerCase(),
    },
  });

  const validation = registerSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  if (user)
    return NextResponse.json(
      { message: 'user has already taken' },
      { status: 400 }
    );

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email.toLocaleLowerCase(),
      password: hashedPassword,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
