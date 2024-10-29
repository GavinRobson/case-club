'use client';

import { useRouter } from 'next/navigation'

const ViewProfileButton = ({ username }: {username: string | null | undefined}) => {
  const router = useRouter();
  return ( 
    <div 
      onClick={() => router.push(`/profile/${username}`)}
      className=" text-white/50 py-1 px-4 hover:text-white hover:bg-white/30 hover:outline hover:outline-1 cursor-pointer transition rounded-[0.25rem]"
    >
      View Profile
    </div>
   );
}
 
export default ViewProfileButton;