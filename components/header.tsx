"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

export function Header() {
  const pathname = usePathname()

  return (
    <header className="py-4 bg-[#e6f0fa]">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-[#2d3748] text-3xl font-bold">
          E-Davis
        </Link>

        <nav className="flex items-center space-x-8">
          <Link href="/services" className="text-[#2d3748]">
            Услуги
          </Link>
          <Link href="/news" className="text-[#2d3748]">
            Новости
          </Link>
          <Link href="/news" className="text-[#2d3748]">
            Новости
          </Link>
          <Link href="/jobs" className="text-[#2d3748]">
            Вакансии
          </Link>
          <div className="relative group">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors flex items-center gap-2">
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
                <Link href="treasury" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Состояние и динамика казны
                </Link>
                <Link href="/goverment/news" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Новости Правительства
                </Link>
                <Link
                  href="/goverment/treasury-services"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Услуги Государственного Казначейства (Все лицензии)
                </Link>
                <Link
                  href="/goverment/advocacy-services"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Услуги Адвокатуры (Помощь в написании исков/жалоб в огп)
                </Link>
                <Link
                  href="/goverment/dmo-services"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Услуги ДМО (Провизия)
                </Link>
                <Link
                  href="/goverment/legislative-initiative"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Подача законодательной инициативы в сенат от граждан
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
