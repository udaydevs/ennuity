"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="relative flex items-center justify-between bg-transparent border-b border-white/50 w-[60%] mx-auto pb-0.5">
      {/* Left Section */}
      <div className="flex items-center space-x-6">
        <div className="text-[16px] font-bold"> Ennuity</div>
        <button className="text-[16px] text-white hover:text-cyan-300 transition">Features</button>
        <button className="text-[16px] text-white hover:text-cyan-300 transition">Methods</button>
        <button className="text-[16px] text-white hover:text-cyan-300 transition">Pricing</button>
        <button className="text-[16px] text-white hover:text-cyan-300 transition">About</button>
      </div>

      <div className="flex items-center space-x-4">
        <Link href={'./AuthPage?mode=signin'}>
          <button className="text-[16px] text-white hover:text-cyan-300 transition">
            Sign In
          </button>
        </Link>
        <Link href={'./AuthPage?mode=signup'}>
          <button className="relative group cursor-pointer rounded-full p-px text-sm font-semibold text-white shadow-2xl shadow-zinc-900">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            </span>
            <div className="relative flex items-center space-x-2 z-10 rounded-full bg-blue-950 py-1 px-2 ring-1 ring-white/10">
              <span className="m-1"> Sign Up</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M10.75 8.75L14.25 12L10.75 15.25"
                />
              </svg>
            </div>
            <span className="absolute bottom-0 left-4.5 h-px w-[calc(100%-2.25rem)] bg-linear-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
          </button>
        </Link>
      </div>
    </div>
  );
}
