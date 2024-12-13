'use client'
import { useRouter } from "next/navigation";

const RedirectToSignIn = ({page}: {page: string}) => {
  const router = useRouter();

  const onClick = () => {
    router.push('/auth/login');
  }

  return ( 
    <div className="w-screen h-auto p-10 items-center flex justify-center">
      <div className="flex flex-row space-x-[5px]">
        <p>Please</p>
        <p 
          className="text-emerald-500 cursor-pointer hover:underline hover:text-emerald-600"
          onClick={onClick}
        >
          sign in
        </p>
        <p>to see your {page}</p>
      </div>
    </div>
   );
}
 
export default RedirectToSignIn;