'use client';

import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation';

type Props = {
  crate: any;
}

const CrateButton = ({ crate }: Props) => {
  const router = useRouter();
  const [size, setSize] = useState(150);

  const handleMouseEnter = () => setSize(175);
  const handleMouseLeave = () => setSize(150);

  const onClick = () => {
    const crateUrl = encodeURI(crate.case_id);
    const url = `/cases/open/${crateUrl}`;
    router.push(url);
  };

  return ( 
    <div 
      className="flex flex-col min-h-[250px] bg-slate-700 items-center justify-center hover:bg-slate-600 hover:cursor-pointer transition"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <Image src={crate.image} alt="Crate" height={size} width={size} className="drop-shadow-lg"/>
      <span>{crate.name}</span>
      <span>${crate.value.toFixed(2)}</span>
    </div>
   );
}
 
export default CrateButton;