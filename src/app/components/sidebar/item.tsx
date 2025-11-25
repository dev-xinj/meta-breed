"use client";
import { ChevronDown, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
export default function Item({ item }: { item: ISidebarItem }) {
  const { name, icon: Icon, sub, path } = item;
  const pathname = usePathname();
  console.log("pathname " + pathname);
  console.log("path " + path);
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={`flex items-center p-3 rounded-lg cursor-pointer justify-between
      ${
        isActive
          ? "bg-violet-100 text-violet-600"
          : "text-gray-500 hover:bg-violet-50 hover:text-violet-500"
      }`}
    >
      <div className="flex items-center space-x-2">
        <Icon size={18} />
        <p className="text-sm font-semibold">{name}</p>
      </div>

      {sub && sub.length > 0 && <ChevronDown size={18} />}
    </Link>
  );
}
