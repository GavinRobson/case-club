import {NextResponse} from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/auth';

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userId = session.user.id;

    const inventory = await db.inventory.findUnique({
      where: {
        userId
      }
    });

    if (!inventory) {
      return NextResponse.json({ error: 'Inventory not found' }, { status: 404 });
    }

    await db.inventorySkin.deleteMany({
      where: {
        inventory_id: inventory.id
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed reseting inventory' }, { status: 500 })
  }
}