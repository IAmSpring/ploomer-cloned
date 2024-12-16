"use client"

import Link from "next/link"
import Image from "next/image"
import { NAV_LINKS } from "@/lib/constants"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/ploomber-mascot.png"
            alt="Ploomber"
            width={48}
            height={48}
            className="w-12 h-12"
          />
          <span className="text-2xl font-bold">Ploomber</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-base hover:text-gray-900 transition-colors ${
                index === 0 ? 'text-[#FFD666]' : 'text-gray-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Get Started Button */}
        <Link
          href="https://www.platform.ploomber.io/register"
          className="bg-[#FFD666] text-black px-6 py-2 rounded-md hover:bg-[#FFD666]/90 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </nav>
  )
} 