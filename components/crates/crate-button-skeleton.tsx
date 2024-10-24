import { LoaderCircle } from "lucide-react";

const CrateButttonSkeleton = () => {
  return ( 
    <div className="flex flex-col min-h-[250px] bg-slate-700 items-center justify-center animate-pulse">
      <LoaderCircle className="animate-spin" style={{ height: 50, width: 50 }}/>
      <div className="mt-2 bg-gray-500 h-4 w-32 rounded animate-pulse"></div>
    </div>
   );
}
 
export default CrateButttonSkeleton;