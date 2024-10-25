import MobileNavButton from "@/components/navigation/mobile-nav-button";

const routes = [
  {
    href: '/cases',
    label: 'Cases'
  },
  {
    href: '/battles',
    label: 'Battles'
  },
  {
    href: '/inventory',
    label: 'Inventory'
  },
];

const MobileNavigation = () => {
  return ( 
    <nav className="items-center w-full">
      {routes.map((route) => (
        <MobileNavButton key={route.href} href={route.href} label={route.label} />
      ))}
    </nav>
   );
}
 
export default MobileNavigation;