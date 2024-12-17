import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import type { Session } from 'next-auth'
import { NAV_LINKS } from '@/lib/constants'

export default function Navbar() {
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'

  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4 h-[70px] flex items-center justify-between">
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

        <div className="hidden md:flex items-center gap-8">
          {isAuthenticated ? (
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
              {session?.user?.role === 'admin' && (
                <Link href="/admin" className="text-base hover:text-gray-900">
                  Admin
                </Link>
              )}
            </>
          ) : (
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
          <Link href="/documentation" className="text-base hover:text-gray-900">
            Documentation
          </Link>
        </div>
      </div>
    </nav>
  )
} 