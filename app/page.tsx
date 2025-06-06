"use client"

import { getPopularServices } from "@/lib/services"
import ServiceCard from "@/components/service-card"
import Image from "next/image"

import Link from "next/link"
import ChatBot from "@/components/chat-bot"


export default async function Home() {
  const popularServices = await getPopularServices()

  return (
    <div className="min-h-screen bg-[#e6f0fa]">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d3748] leading-tight mb-6">
                Добро пожаловать
                <br />
                на портал услуг штата
                <br />
                Davis
              </h1>
              <p className="text-xl text-gray-600 mb-8">Все нужное теперь на одном портале</p>
            </div>
            <div className="relative flex justify-start">
              <ChatBot />
            </div>
          </div>
        </section>
      </div>

      {/* White background section starting from middle of service icons */}
      <div className="bg-white pt-20 pb-12 -mt-16">
        <div className="container mx-auto px-4">
          {/* Service Categories */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-32">
            <Link
              href="/services"
              className="block bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="text-white h-10 w-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6H20M4 12H20M4 18H12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#2d3748]">Услуги</h3>
            </Link>

            <Link
              href="/jobs"
              className="block bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="text-white h-10 w-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#2d3748]">Вакансии</h3>
            </Link>

            <Link
              href="/faq"
              className="block bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="text-white h-10 w-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 16V12M12 8H12.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-lg text-[#2d3748]">Часто задаваемые</p>
                <p className="text-lg text-[#2d3748]">вопросы!</p>
              </div>
            </Link>
          </section>

          {/* Popular Services */}
          <section className="py-12">
            <h2 className="text-2xl font-bold text-[#2d3748] mb-6">Популярные услуги</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {popularServices.slice(0, 4).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
