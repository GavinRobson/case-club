'use client'

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

type Props = {
  item: any;
}

const ItemButton = ({ item }: Props) => {
  const router = useRouter();
  const [size, setSize] = useState(150);

  const handleMouseEnter = () => setSize(175);
  const handleMouseLeave = () => setSize(150);

  const onClick = () => {
    const itemUrl = encodeURI(item.market_hash_name)
    const url = `https://steamcommunity.com/market/listings/730/${itemUrl}`;
    router.push(url);
  }

  return ( 
    <div
      className="flex flex-col min-h-[250px] bg-slate-700 items-center justify-center hover:bg-slate-600 hover:cursor-pointer transition"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image src={item.image} alt="Item" height={size} width={size} className="drop-shadow-lg" />
      <span>{item.name}</span>
      <span>{item.value}</span>
    </div>
   );
}
 
export default ItemButton;