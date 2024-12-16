"use client"

import Link from "next/link"
import { ImageWithFallback } from "@/app/components/ui/image-with-fallback"
import { FOOTER_LINKS } from "@/lib/constants"

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Social Links */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <ImageWithFallback
                src="/images/logo.png"
                alt="Ploomber Logo"
                width={32}
                height={32}
              />
              <span className="font-semibold">Ploomber</span>
            </Link>
            <div className="flex gap-4">
              {FOOTER_LINKS.social.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <i className={`fab fa-${link.icon} text-xl`}></i>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-gray-600 hover:text-gray-900">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Location & Contact</h3>
            <p className="text-gray-600 mb-2">
              69 Charlton Street, New York, NY 10014
            </p>
            <Link
              href="mailto:contact@ploomber.io"
              className="text-gray-600 hover:text-gray-900"
            >
              contact@ploomber.io
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-600 pt-8 border-t">
          © {new Date().getFullYear()} Ploomber. All rights reserved.
        </div>
      </div>
    </footer>
  )
} 