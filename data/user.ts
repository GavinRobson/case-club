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

export const getUserByUsername = async (username: string | undefined) => {
  if (username === undefined) {
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: {
        name: username
      }
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
}

export const checkFriends = async (id: string | undefined, friendName: string | undefined) => {
  if (id === undefined) {
    return null;
  }

  try {
    const user = await db.user.findFirst({
      where: {
        id,
        friends: {
          some: {
            name: friendName
          }
        }
      },
    });

    if (!user) {
      return false;
    }

    return true;
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
    const user = await db.user.findUnique({
      where: {
        id
      }
    });
    if (!user) {
      return null;
    }
    
    return user.earned
  } catch (error) {
    return null;
  }
} 