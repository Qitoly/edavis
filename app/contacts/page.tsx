import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Контакты - E-Davis",
  description: "Контактная информация портала E-Davis",
}

export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white drop-shadow mb-6">Контакты</h1>
      <div className="bg-slate-800/50 rounded-xl shadow-xl p-6 space-y-4">
        <p className="text-slate-300">
          По IC вопросам (услуги, новости и тд.) обращайтесь в DS -{' '}
          <Link
            href="https://www.discordapp.com/users/852843568259530772"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            renecounty
          </Link>
        </p>
        <p className="text-slate-300">
          По тех. вопросам сайтов и ботв, а также по поводу заказов обращайтесь в DS -{' '}
          <Link
            href="https://www.discordapp.com/users/213012661959393280"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            qitoly
          </Link>{' '}
          или в telegram -{' '}
          <a
            href="https://t.me/QitolyAsk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            t.me/QitolyAsk
          </a>
        </p>
      </div>
    </div>
  )
}
