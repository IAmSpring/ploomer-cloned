"use client"

import Link from "next/link"
import Image from "next/image"
import { NAV_LINKS } from "@/lib/constants"

export function Nav() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Ploomber Logo"
              width={260}
              height={90}
              className="h-8 w-auto"
            />
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-gray-600 hover:text-gray-900"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Link 
          href="https://www.platform.ploomber.io/register"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Get Started
        </Link>
      </div>
    </nav>
  )
} 