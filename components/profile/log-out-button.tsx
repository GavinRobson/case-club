'use client'

import { Button } from "@/components/ui/button";
import { signOutAction } from "@/actions/sign-out-action";

const LogOutButton = () => {
  return ( 
    <Button
      variant='destructive'
      className="mt-2"
      onClick={() => signOutAction()}
    >
      Log Out
    </Button>
   );
}
 
export default LogOutButton;