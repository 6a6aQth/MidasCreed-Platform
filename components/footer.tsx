"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Linkedin } from "lucide-react"

// Custom X (Twitter) Icon
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export function Footer() {
  const pathname = usePathname()

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/login")) {
    return null;
  }

  return (
    <footer className="border-t relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-blue-800/40" />
      <div className="container py-8 md:py-12 relative z-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About MidasCreed</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">AI Consultancy — from first automation to AI-native operations</p>
            <div className="flex space-x-4">
              <Link
                href="https://x.com/MidasCreed"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/MidasCreed/"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services/awareness"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  AI Audit & Awareness
                </Link>
              </li>
              <li>
                <Link
                  href="/services/enablement"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  AI Enablement
                </Link>
              </li>
              <li>
                <Link
                  href="/services/integration"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  AI Integration
                </Link>
              </li>
              <li>
                <Link
                  href="/services/infrastructure"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  AI Infrastructure
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/members"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600 dark:text-gray-300">Lilongwe, Malawi</li>
              <li>
                <a
                  href="tel:+265885535374"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  +265 885 53 53 74
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@midascreed.com"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  info@midascreed.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">MidasCreed © 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
