import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import type { UserRole } from '@prisma/client';
import { ROLES } from '@/types/roles';

interface UserUpdate {
  userId: string;
  updates: {
    role: UserRole;
  };
}

const userSelectFields = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
  image: true,
  emailVerified: true,
  updatedAt: true,
} as const;

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.role || session.user.role !== ROLES.ADMIN) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const users = await prisma.user.findMany({
    select: userSelectFields
  });

  return NextResponse.json(users);
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.role || session.user.role !== ROLES.ADMIN) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { userId, updates }: UserUpdate = await request.json();

  const user = await prisma.user.update({
    where: { id: userId },
    data: updates,
    select: userSelectFields
  });

  return NextResponse.json(user);
} 