import Image from "next/image";
import Link from 'next/link';

const HeaderLogo = () => {
  return ( 
    <Link href="/">
      <div className="h-full flex items-center px-5">
        <Image 
          src={'/logo-test.png'}
          alt="Logo"
          height={100}
          width={100}
        />
      </div>
    </Link>
   );
}
 
export default HeaderLogo;
