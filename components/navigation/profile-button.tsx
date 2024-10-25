import React from 'react';
import { auth } from '@/auth';

import { LoggedInButton } from '@/components/navigation/logged-in-button';
import { SignInButton } from '@/components/navigation/sign-in-button';

export const ProfileButton = async () => {
  const session = await auth();

  console.log(session);

  return (
    <div className='flex items-center ml-auto px-5 h-full'>
        {session ? (
          <div>
            <LoggedInButton username={session.user?.name} />
          </div>
        ): (
          <div className='flex items-center justify-center'>
            <SignInButton />
          </div>
        )}
    </div>
  )
}