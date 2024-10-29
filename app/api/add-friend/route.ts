import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();
  const { friendName } = await request.json();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const existingFriend = await db.user.findFirst({
      where: {
        id: session.user.id,
        friends: {
          some: {
            name: friendName
          }
        }
      }
    });

    if (existingFriend) {
      return NextResponse.json({ message: 'Friend already exists' }, { status: 400 });
    }

    await db.user.update({
      where: {
        id: session.user.id
      },
      data: {
        friends: {
          connect: { name: friendName }
        }
      }
    });
    return NextResponse.json({ message: 'Friend added successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error adding friend" }, { status: 500 })
  }
}