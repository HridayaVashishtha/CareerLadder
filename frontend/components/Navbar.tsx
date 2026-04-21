'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-white/[0.08] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              CareerLadder
            </span>
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
            >
              How It Works
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  isActive('/dashboard')
                    ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05] border border-white/[0.08]'
                }`}
              >
                Dashboard
              </button>
            </Link>

            <Link href="/assessment">
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium transition-all transform hover:scale-105 text-sm shadow-lg shadow-purple-500/20">
                Assessment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
