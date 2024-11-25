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

export const states = [
  "",
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "Abuja"
]