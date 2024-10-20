'use client';

type Props = {
  children: React.ReactNode;
};

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes'

export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}