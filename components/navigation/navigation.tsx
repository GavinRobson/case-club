import { NavButton } from "@/components/navigation/nav-button";

const routes = [
  {
    href: '/cases',
    label: 'Cases'
  },
  // {
  //   href: '/battles',
  //   label: 'Battles'
  // },
  {
    href: '/inventory',
    label: 'Inventory'
  },
  {
    href: '/history',
    label: 'History'
  },
  {
    href: '/friends',
    label: 'Friends'
  },
  // {
  //   href: '/leaderboard',
  //   label: 'Leaderboard'
  // },
  {
    href: '/search',
    label: 'Search'
  }
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