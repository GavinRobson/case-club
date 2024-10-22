'use client';

type Props = {
  children: React.ReactNode;
};

import { SessionProvider } from 'next-auth/react';

export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  );
}