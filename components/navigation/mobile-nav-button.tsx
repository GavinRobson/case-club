'use client';

import { usePathname } from 'next/navigation';
import  { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
  href: string;
  label: string
}

const MobileNavButton = ({ href, label }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return ( 
    <Button
      asChild
      size="sm"
      variant='default'
      className={cn(
        'w-full h-[100px] bg-gray-800 hover:text-white border border-neutral-700 hover:border-white transition',
        isActive ? 'bg-[#13151b] text-white' : 'text-[#45484e]'
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
   );
}
 
export default MobileNavButton;