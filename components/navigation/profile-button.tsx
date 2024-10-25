import React from 'react';
import { auth } from '@/auth';

import { LoggedInButton } from '@/components/navigation/logged-in-button';
import { SignInButton } from '@/components/navigation/sign-in-button';
import { getTotalEarned } from '@/data/user';

export const ProfileButton = async () => {
  const session = await auth();

  let earned: number | null = 0;
  if (session) {
    earned = await getTotalEarned(session?.user?.id)
  }

  return (
      <div className='flex items-center ml-auto px-5 h-full'>
          {session ? (
            <div>
              <LoggedInButton username={session.user?.name} earned={earned}/>
            </div>
          ): (
            <div className='flex items-center justify-center'>
              <SignInButton />
            </div>
          )}
      </div>
  )
}