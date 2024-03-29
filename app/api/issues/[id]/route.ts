import { patchIssueSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/authOptions';

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
  const { title, description, assignedToUserId } = body;

  const validation = patchIssueSchema.safeParse(body);

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });

    if (!user)
      return NextResponse.json({ error: 'Invalid user.' }, { status: 400 });
  }

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
      title,
      description,
      assignedToUserId,
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
