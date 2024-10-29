'use client';

import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ResetInventoryButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const onClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/inventory/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        setError(true);
        return null;
      }

      await response.json();
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
      router.refresh();

    }
  }

  return ( 
    <div className="pl-10">
      <Button
        variant='destructive'
        onClick={onClick}
      >
        {isLoading ? 'Resetting...' : error ? 'Error' : success ? 'Success' : 'Reset Inventory'}
      </Button>
      </div>
   );
}
 
export default ResetInventoryButton;