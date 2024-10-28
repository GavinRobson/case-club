'use client'

import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";

type Props = {
  item: any;
}

const ItemButton = ({ item }: Props) => {

  const [size, setSize] = useState(150);

  const handleMouseEnter = () => setSize(175);
  const handleMouseLeave = () => setSize(150);

  const onClick = () => {
    const itemUrl = encodeURI(item.market_hash_name)
    const url = `https://steamcommunity.com/market/listings/730/${itemUrl}`;
    window.open(url, '_blank');
  }

  return ( 
    <div
      className="flex flex-col min-h-[250px] bg-slate-700 items-center justify-center hover:bg-slate-600 transition w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col items-center flex-grow min-w-[200px]">
        <Image src={item.image} alt="Item" height={size} width={size} className="drop-shadow-lg" />
        <span>{item.name}</span>
        <span className="text-orange-400">{item.stattrak ? 'StatTrak™' : ' '}</span>
      </div>
      <span className="pb-2 text-lg">${item.value.toFixed(2)}</span>
      <Button
        variant="steam"
        className="mb-2 flex"
        onClick={onClick}
        > 
        <Image src={'/steam_logo.png'} alt="Steam" height={20} width={20}/>
        View on Steam
      </Button>
    </div>
   );
}
 
export default ItemButton;