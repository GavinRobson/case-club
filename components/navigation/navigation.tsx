import { NavButton } from "@/components/navigation/nav-button";

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

export const Navigation = async () => {
  return (
    <nav className="flex items-center h-full">
      {routes.map((route) => (
        <NavButton key={route.href} href={route.href} label={route.label} />
      ))}
    </nav>
  );
}