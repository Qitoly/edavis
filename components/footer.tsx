import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="py-6 bg-[#e6f0fa] mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">E-Davis</h3>
            <p className="text-gray-600">Официальный портал услуг штата Davis</p>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-gray-600">Услуги</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="hover:text-blue-200 text-gray-600">
                  Все услуги
                </Link>
              </li>
              <li>
                <Link href="/services/popular" className="hover:text-blue-200 text-gray-600">
                  Популярные услуги
                </Link>
              </li>
              <li>
                <Link href="/services/new" className="hover:text-blue-200 text-gray-600">
                  Новые услуги
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-gray-600">Информация</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-blue-200 text-gray-600">
                  О правительстве
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-blue-200 text-gray-600">
                  Новости
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-blue-200 text-gray-600">
                  Вакансии
                </Link>
              </li>
              <li>
                <Link href="/important" className="hover:text-blue-200 text-gray-600">
                  Важная информация
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-gray-600">Поддержка</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="hover:text-blue-200 text-gray-600">
                  Часто задаваемые вопросы
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-blue-200 text-gray-600">
                  Контакты
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-blue-200 text-gray-600">
                  Обратная связь
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Image src="/images/robot-assistant.svg" alt="E-Davis Robot" width={40} height={40} />
        </div>
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">© 2025 E-Davis. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
