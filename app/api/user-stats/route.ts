import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  try {
    const userStats = await db.user.findUnique({
      where: {
        id
      }
    });
    
    return NextResponse.json({ spent: userStats?.spent, earned: userStats?.earned })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user stats' }, { status: 500 })
  }
}