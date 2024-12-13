'use client'

import { CircleUser } from "lucide-react";
import { useRouter } from "next/navigation";


const LoggedInMobile = ({username}: {username: string | null | undefined}) => {
  const router = useRouter();
  return ( 
    <div 
      className="text-gray-600"
      onClick={() => {
        router.push(`/profile/${username}`)
      }}
    >
      <CircleUser />
    </div>
   );
}
 
export default LoggedInMobile;