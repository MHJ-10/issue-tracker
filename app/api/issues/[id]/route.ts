import { NextRequest, NextResponse } from 'next/server';
import { issueSchema } from '../route';
import prisma from '@/prisma/client';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
