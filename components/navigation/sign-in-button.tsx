'use client';

import { Button } from '@/components/ui/button';
import { CircleUserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const SignInButton = () => {
  const router = useRouter();

  const handleClick = () => router.push('/auth/login');

  return (
    <div>
      <Button
        size='sm'
        variant='outline'
        className="bg-[#272a30] rounded-xl border-none outline-none hover:bg-white/20 transition"
        onClick={handleClick}
      >
        <div className="w-full h-full flex flex-row gap-x-2 items-center text-neutral-500 transition-none hover:text-white transition">
          <CircleUserRound size={18} />
          Sign In
        </div>
      </Button>
    </div>
  )
}