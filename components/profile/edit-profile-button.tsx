'use client'

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const EditProfileButton = ({username}: {username: string | null}) => {
  const router = useRouter();
  
  const onClick = () => {
    router.push(`/profile/${username}/edit`)
  }
  return ( 
    <Button
      variant="green"
      className="mt-2"
      onClick={onClick}
    >
      Edit profile
    </Button>
   );
}
 
export default EditProfileButton;