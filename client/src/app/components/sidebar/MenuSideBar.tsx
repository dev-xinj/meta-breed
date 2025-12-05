'use client'
import { Bell, Flag, LayoutGrid, LucideIcon, Users } from "lucide-react";
import Item from "./ItemSideBar";
// import Item from "./item";


interface ISidebarItem {
  name: string;
  icon: LucideIcon;
  path: string;
  sub?: ISubSidebarItem[];
}
interface ISubSidebarItem {
  name: string;
  icon: LucideIcon;
  path: string;
}
const items: ISidebarItem[] = [
  {
    name: "Dashboard",
    icon: LayoutGrid,
    path: "/",
  },
  {
    name: "Accounts",
    icon: Users,
    path: "/accounts",
  },
  {
    name: "Fanpages",
    icon: Flag,
    path: "/fanpages",
  },
  {
    name: "Setting",
    icon: Users,
    path: "/setting",
    sub: [
      {
        name: "Notification",
        icon: Bell,
        path: "/setting/notification",
      },
    ],
  },
];
export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-10 p-3">
      <div className="flex flex-col space-y-10 w-full">
        <h2 className="font-bold ">MetaSpreed</h2>
        <div className="flex flex-col space-y-1">
          {items.map((item) => (
            <Item key={item.path} item={item}></Item>
          ))}
        </div>
      </div>
    </div>
  );
}
