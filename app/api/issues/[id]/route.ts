import { issueSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '../../auth/authOptions';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: 'user not authorized' },
      { status: 401 }
    );

  const body = await req.json();

  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!issue)
    return NextResponse.json({ message: 'issue not found.' }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: +params.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue, { status: 201 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: 'user not authorized' },
      { status: 401 }
    );

  const issue = await prisma.issue.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!issue)
    return NextResponse.json({ message: 'issue not found' }, { status: 404 });

  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });

  return NextResponse.json({}, { status: 200 });
}
