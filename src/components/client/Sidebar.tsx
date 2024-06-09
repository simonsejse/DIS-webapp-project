import React from 'react';
import Link from 'next/link';

import {
  LayoutDashboard,
  BadgeDollarSign,
  PieChart,
  Target,
  FileText,
  Settings,
  Ellipsis,
  Calculator,
} from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import LogoText from './LogoText';

const MenuItems = [
  {
    name: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'Regnskab',
    path: '/dashboard/regnskab',
    icon: Calculator,
  },
  {
    name: 'Transaktioner (WIP)',
    path: '/dashboard/transaktioner',
    icon: BadgeDollarSign,
  },
  {
    name: 'Budgetter (WIP)',
    path: '/dashboard/budgetter',
    icon: PieChart,
  },
  {
    name: 'Mål (WIP)',
    path: '/dashboard/mal',
    icon: Target,
  },
  {
    name: 'Rapporter (WIP)',
    path: '/dashboard/rapporter',
    icon: FileText,
  },
  {
    name: 'Indstillinger (WIP)',
    path: '/dashboard/indstillinger',
    icon: Settings,
  },
];

const Navbar = async () => {
  const data = await getServerSession(authOptions);

  return (
    <aside
      id="sidebar"
      className="left-0 top-0 z-40 h-screen w-64 transition-transform bg-white dark:bg-slate-900"
      aria-label="Sidebar"
    >
      <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
        <LogoText />

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
  );
};

export default Navbar;
