'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { getUserByEmail, getUserByUsername } from '@/data/user';
import { RegisterSchema } from '@/schemas';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { username, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const emailTaken = await getUserByEmail(email);

  if (emailTaken) {
    return { error: 'Email taken' };
  }

  const usernameTaken = await getUserByUsername(username);


  if (usernameTaken) {
    return { error: 'Username taken' }
  }

  const user = await db.user.create({
    data: {
      name: username,
      email,
      password: hashedPassword,
      spent: 0.0,
      earned: 0.0
    },
  });

  await db.inventory.create({
    data: {
      updatedAt: new Date(),
      userId: user.id
    }
  })

  return { success: 'Success!' };
};
