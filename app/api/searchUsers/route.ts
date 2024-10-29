import { NextResponse } from "next/server";
import { db } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')

  if (!q) {
    return null;
  }

  try {
    const users = await db.user.findMany({
      where: {
        name: {
          contains: q,
          mode: 'insensitive'
        },
      },
      select: {
        id: true,
        name: true,
        spent: true,
        earned: true
      }
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 })
  }
}