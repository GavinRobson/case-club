import HeaderLogo from "@/components/navigation/header-logo";
import { ProfileButton } from "@/components/navigation/profile-button";
import NavigationSideBar from "@/components/navigation/navigation-side-bar";

const MobileHeader = () => {

  return ( 
    <div className="flex flex-row md:hidden h-[98px] bg-[#13151b] relative transition-transform duration-300">
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-6">
          <HeaderLogo height={150} width={150}/>
        </div>
        <div className="flex items-center justify-start h-full">
          <NavigationSideBar />
        </div>
        <div className="flex w-full h-full justify-end">
          <ProfileButton />
        </div>
      </div>
   );
}
 
export default MobileHeader;