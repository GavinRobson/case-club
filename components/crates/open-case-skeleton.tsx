import { LoaderCircle } from "lucide-react";

const OpenCaseSkeleton = () => {
  return ( 
    <div className="absolute inset-10 flex items-center justify-center bg-slate-800 mt-24">
      <div className="flex flex-col items-center h-full pt-10 animate-pulse">
        <LoaderCircle className="animate-spin" style={{ height: 100, width: 100 }}/>
        <div className="mt-4 bg-gray-500 h-6 w-48 rounded"></div>
      </div>
    </div>
   );
}
 
export default OpenCaseSkeleton;