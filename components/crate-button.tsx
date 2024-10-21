import Image from "next/image";

type Props = {
  crate: any;
}

const CrateButton = ({ crate }: Props) => {
  return ( 
    <div className="flex flex-col min-h-[250px] bg-slate-700 items-center justify-center hover:bg-slate-600 hover:cursor-pointer">
      <Image src={crate.image} alt="Crate" height={150} width={150}/>
      <span>{crate.name}</span>
    </div>
   );
}
 
export default CrateButton;