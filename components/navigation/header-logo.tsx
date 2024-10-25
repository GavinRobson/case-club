import Image from "next/image";
import Link from 'next/link';

const HeaderLogo = ({ height, width }: { height: number, width: number }) => {
  return ( 
    <Link href="/">
      <div className="h-full flex items-center">
        <Image 
          src={'/logo-test.png'}
          alt="Logo"
          height={height}
          width={width}
        />
      </div>
    </Link>
   );
}
 
export default HeaderLogo;
