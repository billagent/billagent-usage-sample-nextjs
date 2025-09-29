'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
  icon?: string;
}

const navItems: NavItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: '🏠'
  },
  {
    href: '/getting-started',
    label: 'Getting Started',
    icon: '🚀'
  },
  {
    href: '/sample-contract',
    label: 'Sample Contract',
    icon: '📄'
  },
  {
    href: '/usage-event-simulator',
    label: 'Usage Event Simulator',
    icon: '⚡'
  },
  {
    href: '/sample-addendum',
    label: 'Sample Addendum',
    icon: '📄'
  }
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }
              `}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
