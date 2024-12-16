import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              SaaS Platform
            </Link>
          </div>
          
          <div className="flex items-center">
            {session ? (
              <button
                onClick={() => signOut()}
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 