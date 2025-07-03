"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutGrid, ClipboardList } from "lucide-react";

const navItems = [
  {
    title: "Menu",
    href: "/dashboard/menu",
    icon: LayoutGrid,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ClipboardList,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="w-64 min-h-screen border-r bg-gray-50/40">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                  pathname === item.href ? "bg-gray-100 text-gray-900" : ""
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
