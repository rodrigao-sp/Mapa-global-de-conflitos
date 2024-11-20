'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flag, Shield, BookOpen, BarChart2, AlertCircle } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 h-screen w-16 bg-gray-900 flex flex-col items-center py-8 space-y-8">
      <Link
        href="/"
        className={`p-3 rounded-lg transition-colors ${
          isActive('/') ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
        }`}
        title="Mapa"
      >
        <BarChart2 className="w-6 h-6" />
      </Link>

      <Link
        href="/conflicts"
        className={`p-3 rounded-lg transition-colors ${
          isActive('/conflicts') ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
        }`}
        title="Conflitos Ativos"
      >
        <Flag className="w-6 h-6" />
      </Link>

      <Link
        href="/prevention"
        className={`p-3 rounded-lg transition-colors ${
          isActive('/prevention') ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
        }`}
        title="Prevenção"
      >
        <Shield className="w-6 h-6" />
      </Link>

      <Link
        href="/guidelines"
        className={`p-3 rounded-lg transition-colors ${
          isActive('/guidelines') ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
        }`}
        title="Diretrizes"
      >
        <BookOpen className="w-6 h-6" />
      </Link>

      <Link
        href="/statistics"
        className={`p-3 rounded-lg transition-colors ${
          isActive('/statistics') ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
        }`}
        title="Estatísticas"
      >
        <AlertCircle className="w-6 h-6" />
      </Link>
    </nav>
  );
}
