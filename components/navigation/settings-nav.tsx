'use client';

import { useRouter } from 'next/navigation';

export const SettingsNav = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push('/settings')}
      className="text-white/50 py-1 px-4 hover:bg-white/30 hover:text-white hover:outline hover:outline-1 cursor-pointer transition rounded-[0.25rem]"
    >
      Settings
    </div>
  );
};
