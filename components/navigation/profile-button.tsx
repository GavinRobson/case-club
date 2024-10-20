import { signOut } from 'next-auth/react';

import { auth } from '@/auth';

import { LoggedInButton } from '@/components/navigation/logged-in-button';
import { SignInButton } from '@/components/navigation/sign-in-button';

export const ProfileButton = async () => {
  const session = await auth();
  const handleLogout = () => {
    signOut();
  };

  return (
    <div className='flex items-center ml-auto px-5 h-[37px]'>
      <div className='pt-2'>
        {session ? (
          <LoggedInButton username={session.user?.name} />
        ): (
          <SignInButton />
        )}
      </div>
    </div>
  )
}