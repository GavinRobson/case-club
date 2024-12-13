import React from 'react';
import { auth } from '@/auth';

import { LoggedInButton } from '@/components/navigation/logged-in-button';
import { SignInButton } from '@/components/navigation/sign-in-button';
import LoggedInMobile from './logged-in-mobile';

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

  return (
      <div className='flex items-center ml-auto px-5 h-full z-50'>
        <div className='md:block hidden'>
          <LoggedInButton username={session.user?.name} userId={session?.user?.id}/>
        </div>
        <div className='md:hidden block'>
          <LoggedInMobile username={session?.user?.name}/>
        </div>
      </div>
  )
}