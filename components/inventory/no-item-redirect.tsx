'use client';

import { useRouter } from "next/navigation";

const NoItemRedirect = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/cases')
  }

  return ( 
    <div className="w-full items-center flex flex-col justify-center"> 
        <span>
          You have no items
        </span>
        <span className="flex flex-row space-x-2 items-center">
          <span>
            Click
          </span>
          <span 
            onClick={handleClick}
            className="font-semitbold text-red-500 hover:cursor-pointer hover:text-red-300"
          >
            Here
          </span>
          <span>
            to start opening cases
          </span>
        </span>
      </div>
   );
}
 
export default NoItemRedirect;