import React from 'react';
import { auth } from '@/auth';

import { LoggedInButton } from '@/components/navigation/logged-in-button';
import { SignInButton } from '@/components/navigation/sign-in-button';
import { getTotalEarned } from '@/data/user';
import { db } from '@/lib/db';

export const ProfileButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <div className='flex items-center ml-auto px-5 h-full z-50'>
        <div className='flex items-center justify-center'>
          <SignInButton />
        </div>
      </div>
    )
  }

  const user = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    }
  })

  return (
      <div className='flex items-center ml-auto px-5 h-full z-50'>
        <div>
          <LoggedInButton username={session.user?.name} userId={session?.user?.id}/>
        </div>
      </div>
  )
}