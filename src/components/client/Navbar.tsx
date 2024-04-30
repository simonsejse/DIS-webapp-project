import React from "react";
import Link from "next/link";

import {
  LayoutDashboard,
  BadgeDollarSign,
  PieChart,
  Target,
  FileText,
  Settings,
  Ellipsis,
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const MenuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Transaktioner",
    path: "/dashboard/transaktioner",
    icon: BadgeDollarSign,
  },
  {
    name: "Budgetter",
    path: "/dashboard/budgetter",
    icon: PieChart,
  },
  {
    name: "Mål",
    path: "/dashboard/mal",
    icon: Target,
  },
  {
    name: "Rapporter",
    path: "/dashboard/rapporter",
    icon: FileText,
  },
  {
    name: "Indstillinger",
    path: "/dashboard/indstillinger",
    icon: Settings,
  },
];

const Navbar = async () => {
  const data = await getServerSession(authOptions);

  return (
    <div className="h-screen w-screen bg-white dark:bg-slate-900">
      <aside
        id="sidebar"
        className="fixed left-0 top-0 z-40 h-screen w-64 transition-transform"
        aria-label="Sidebar"
      >
        <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white">
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <span className="ml-3 text-base font-semibold">
              Finans<span className="text-blue-600 text-bold">Fokus</span>
            </span>
          </div>
          <ul className="space-y-2 text-sm font-medium">
            {MenuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.path}>
                  <div className="flex items-center px-3 py-2">
                    <item.icon className="h-5 w-5" />
                    <span className="ml-3">{item.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex">
            <div className="flex w-full justify-between">
              <span className="text-sm font-medium text-black dark:text-white">
                {data?.user?.email}
              </span>
              <Ellipsis className="h-5 w-5" />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
