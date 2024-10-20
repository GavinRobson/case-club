'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
  href: string;
  label: string;
}

export const NavButton = ({ href, label }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Button
      asChild
      size="sm"
      variant="outline"
      className={cn(
        'min-w-36 h-full bg-[#0e1015] border-t-0 border-l-0 hover:text-white border-neutral-700 hover:border-b-0 transition',
        isActive ? 'bg-[#13151b] text-white border-b-0' : 'text-[#45484e]'
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  )
}