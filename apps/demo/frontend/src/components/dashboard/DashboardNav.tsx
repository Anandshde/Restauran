"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  ClipboardList,
  ChefHat,
  LogOut,
  Settings,
} from "lucide-react";

const navItems = [
  {
    title: "Menu",
    href: "/dashboard/menu",
    icon: LayoutGrid,
    description: "Manage food items and categories",
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ClipboardList,
    description: "Track and manage orders",
  },
  {
    title: "Kitchen View",
    href: "/kitchen",
    icon: ChefHat,
    description: "Real-time kitchen display",
  },
];

const bottomNavItems = [
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Logout",
    href: "/admin/login",
    icon: LogOut,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="w-64 min-h-screen border-r bg-white">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900">Restaurant Admin</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your restaurant</p>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href} className="relative">
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg relative z-10 transition-colors",
                    isActive
                      ? "text-orange-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute inset-0 bg-orange-50 rounded-lg -z-10"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t">
          {bottomNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors",
                pathname === item.href && "text-orange-600 bg-orange-50"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
