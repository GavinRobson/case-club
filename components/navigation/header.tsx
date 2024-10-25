import HeaderLogo from "@/components/navigation/header-logo";
import { Navigation } from "@/components/navigation/navigation";
import { ProfileButton } from "@/components/navigation/profile-button";

const Header = () => {
  return ( 
    <header className="h-[98px] bg-[#13151b] hidden md:block">
      <div className="h-full flex flex-row">
        <HeaderLogo height={100} width={100}/>
        <Navigation />
        <ProfileButton />
      </div>
    </header>
   );
}
 
export default Header;