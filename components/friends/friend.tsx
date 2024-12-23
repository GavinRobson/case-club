'use client'

import { useRouter } from "next/navigation";

type Friend = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  emailVerified: Date | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
  spent: number | null;
  earned: number | null;
}

const Friends = ({friend}: {friend: Friend}) => {
  const router = useRouter();
  let profit;
  if (friend.spent !== null && friend.earned !== null) {
    profit = friend.earned - friend.spent;
  } else {
    profit = 0;
  }
  return ( 
    <div className="relative md:w-1/2 w-3/4 bg-slate-600 min-h-20 rounded-lg flex md:flex-row flex-col items-center justify-center p-2">
      <span 
        className="absolute left-2 cursor-pointer hover:underline"
        onClick={() => {
          router.push(`/profile/${friend.name}`)
        }}
      >
          {friend.name}
      </span>
      <span className="w-1/4 justify-center flex">Spent: ${friend.spent?.toFixed(2)}</span>
      <span className="w-1/4 justify-center flex">Earned: ${friend.earned?.toFixed(2)}</span>
      <span className={`absolute right-2 ${profit > 0 ? 'text-green-500' : 'text-red-500'}`}>Profit: {profit < 0 && '-'}${Math.abs(profit).toFixed(2)}</span>
    </div>
   );
}
 
export default Friends;