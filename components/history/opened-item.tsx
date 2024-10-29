import Image from "next/image";
import WearBar from "@/components/crates/wear-bar";

const OpenedItem = (item: any) => {
  return ( 
    <div className="w-1/2 bg-slate-600 min-h-20 rounded-lg flex flex-row items-center justify-between p-2">
      <Image src={item.item.image} alt="skin" height={100} width={100}/>
      <div className="flex flex-col items-center justify-center">
        <span>({item.item.wear})</span>
        <span>{item.item.name}</span>
      </div> 
      <div className="flex flex-col space-y-4 items-center justify-center">
        <span>Float: {item.item.float}</span>
        <WearBar float={item.item.float}/>
      </div> 
      <span>Value: {`$${item.item.value}`}</span>
      <div className="flex flex-col space-y-1 items-center justify-center">
        <Image src={item.item.case.image} alt="case" height={50} width={50}/>
        <span>{item.item.case.name}</span>
        <span>Cost: {`$${item.item.case.value}`}</span>
      </div>
    </div>
   );
}
 
export default OpenedItem;