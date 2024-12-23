import { CircleUser } from "lucide-react";
import Image from "next/image";

const UserImage = ({ self, image }: {self: boolean, image: string | null}) => {
  const hasImage = image !== null;
  if (!self) {
    return (
      <>
        {hasImage ? <Image src={image} alt='userimage' height={30} width={30} /> : <CircleUser size={30} className="text-gray-600"/>}
      </>
    )
  }

  return (
    <div className="rounded-full peer hover:bg-slate-700">
      {hasImage ? <Image src={image} alt='userimage' height={30} width={30} /> : <CircleUser size={30} className="text-gray-600"/>}
    </div>
  )
}
 
export default UserImage;