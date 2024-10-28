import { db } from '@/lib/db';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string | undefined) => {
  if (id === undefined) {
    return null;
  }
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch (error) {
    return null;
  }
}

export const getAllItems = async (id: string | undefined) => {
  if (id === undefined) {
    return null;
  }
  try {
    const userItems = await db.user.findUnique({ 
      where: { 
        id
      },
      include: {
        inventory: {
          include: {
            inventorySkin: {
              orderBy: {
                opened_at: 'asc'
              }
            }
          }
        }
      },
    });

    return userItems;
  } catch (error) {
    return null;
  }
}

export const getTotalEarned = async (id: string | undefined) => {
  if (id === undefined) {
    return null;
  }
  try {
    const user = await getAllItems(id);
    const items = user?.inventory?.inventorySkin;

    if (!items || items === undefined) {
      return 0;
    }

    let totalEarned = 0;
    for (let i = 0; i < items.length; i++){
      if (items[i].value === null) continue;

      const value = items[i].value!;
      totalEarned += value;
    } 
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        earned: totalEarned
      }
    })
    return totalEarned;
  } catch (error) {
    return null;
  }
} 