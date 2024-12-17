"use client"

import Link from "next/link"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"
import { NAV_LINKS } from "@/lib/constants"

export default function Navbar() {
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'

  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Ploomber"
            width={160}
            height={50}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {isAuthenticated ? (
            // Authenticated Navigation
            <>
              <Link href="/dashboard" className="text-base hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/dashboard/analytics" className="text-base hover:text-gray-900">
                Analytics
              </Link>
              <Link href="/dashboard/settings" className="text-base hover:text-gray-900">
                Settings
              </Link>
            </>
          ) : (
            // Public Navigation
            NAV_LINKS.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-base hover:text-gray-900 transition-colors ${
                  index === 0 ? 'text-[#FFD666]' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))
          )}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-600">
                {session?.user?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="bg-[#FFD666] text-black px-6 py-2 rounded-md hover:bg-[#FFD666]/90 transition-colors"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
} 