import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="py-6 mt-12">
      <div className="container mx-auto px-4 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">E-Davis</h3>
            <p className="text-slate-300">Официальный портал услуг штата Davis</p>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-slate-300">Услуги</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="hover:text-blue-400 text-slate-300">
                  Все услуги
                </Link>
              </li>

            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-slate-300">Информация</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/goverment/capitol-plan" className="hover:text-blue-400 text-slate-300">
                  План капитолия
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-blue-400 text-slate-300">
                  Новости
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-blue-400 text-slate-300">
                  Вакансии
                </Link>
              </li>

            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-slate-300">Поддержка</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="hover:text-blue-400 text-slate-300">
                  Часто задаваемые вопросы
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-blue-400 text-slate-300">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex justify-center drop-shadow-2xl">
          <Image src="/main.svg" alt="E-Davis Robot" width={80} height={80} />
        </div>
        <div className="mt-8 text-center text-slate-300">
<p className="text-sm">
  © 2025 E-Davis. Все права защищены. Разработано Qitoly. По тех. вопросам и заказам{" "}
  <a href="https://t.me/QitolyAsk" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
    https://t.me/QitolyAsk
  </a>
</p>
        </div>
      </div>
    </footer>
  )
}
