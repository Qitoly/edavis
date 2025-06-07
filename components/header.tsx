"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

export function Header() {
  const pathname = usePathname()

  return (
    <header className="py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2">
          <Image src="/main.svg" alt="E-Davis" width={172} height={172} />

          <span className="sr-only">E-Davis</span>
        </Link>

        <nav className="flex items-center space-x-8 text-white">
          <Link href="/services" className="hover:text-blue-400">
            Услуги
          </Link>
          <Link href="/news" className="hover:text-blue-400">
            Новости
          </Link>
          <Link href="/jobs" className="hover:text-blue-400">
            Вакансии
          </Link>
          <div className="relative group">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-md transition flex items-center gap-2">
              О правительстве
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="py-1">

                <Link
                  href="/goverment/capitol-plan"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  План капитолия
                </Link>
                <Link
                  href="/goverment/members"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Состав Правительства
                </Link>
                <Link href="/treasury" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Состояние и динамика казны
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
