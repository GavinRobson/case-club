'use client';

import { LoaderCircle, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from 'react'; 

const AddFriendButton = ({ friendName }: {friendName: string}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const onClick = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/add-friend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ friendName })
    })

    setIsLoading(false);
    if (response.ok) {
      router.refresh();
    }
  }

  return ( 
    <div 
      className="flex h-10 w-10"
      onClick={onClick}
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin h-full w-full p-2"/>
      ) : (
        <UserPlus 
        className="hover:cursor-pointer hover:bg-slate-500 rounded-lg p-2 h-full w-full" 
        />
      )}
    </div>
   );
}
 
export default AddFriendButton;