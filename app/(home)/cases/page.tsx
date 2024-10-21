'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CasesPage = async () => {
  const router = useRouter();
  const onClick = () => {
    router.push('/populate')
  }
  return (
    <div className="w-screen h-full">
      <Button
        onClick={onClick}
      >
        Populate
      </Button>
      <div className="grid">

      </div>
    </div>
  );
};

export default CasesPage;