import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }
  
  try {
    const {
      name,
      wear,
      value,
      float,
      pattern_id,
      stattrak,
      market_hash_name,
      image,
      skin_id,
      crateValue,
      case_id,
    } = await request.json();

    if (!name || !wear || !float || !pattern_id || !market_hash_name || !image) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    } 

    const parsedFloat = parseFloat(float);
    const parsedPatternId = parseInt(pattern_id, 10);
    const parsedStattrak = stattrak === true;

    const user = await db.user.findUnique({
      where: {
        id: session.user?.id
      },
      include: {
        inventory: true,
      }
    });
    
    
    if (!user || !user.inventory) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    await db.inventorySkin.create({
      data: {
        name,
        wear,
        value: parseFloat(value),
        float: parsedFloat,
        pattern_id: parsedPatternId,
        stattrak: parsedStattrak,
        market_hash_name,
        image,
        updated_at: new Date(),
        inventory_id: user.inventory.id,
        skin_id,
        case_id
      },
    });

    await db.user.update({
      where: {
        id: user?.id
      },
      data: {
        spent: {
          increment: crateValue
        },
        earned: {
          increment: parseFloat(value)
        }
      }
    })

    return NextResponse.json({ message: 'Skin saved successfully' }, { status: 201 });
  } catch (error: any) {
    console.error('Error saving skin:', error);
    return NextResponse.json({ message: 'Error saving skin', error }, { status: 500 });
  }
}