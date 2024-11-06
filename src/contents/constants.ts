import { IconsEnum as Icons } from "@src/types/icons";

interface ISideNavItem { 
  title: string;
  icon: Icons;
  path: string;
}

export const sideNavItems: ISideNavItem[] = [
  {
    title: "Manuscripts",
    icon: Icons.document,
    path: "/manuscripts",
  },
  {
    title: "Profile",
    icon: Icons.profile,
    path: "/profile",
  },
];
