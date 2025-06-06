"use client"

import { getPopularServices } from "@/lib/services"
import ServiceCard from "@/components/service-card"
import Image from "next/image"
import { useState, useRef, type FormEvent } from "react"
import Link from "next/link"
import { searchSite } from "@/lib/search"

type Message = {
  text: string
  isUser: boolean
}

function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Здравствуйте! Я виртуальный помощник портала E-Davis. Чем могу помочь?", isUser: false },
  ])
  const [inputValue, setInputValue] = useState("")
  const [chatHeight, setChatHeight] = useState(300)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userText = inputValue

    const newMessages = [...messages, { text: userText, isUser: true }]
    setMessages(newMessages)
    setInputValue("")

    if (newMessages.length > 3 && chatHeight < 500) {
      setChatHeight((prev) => prev + 50)
    }

    setLoading(true)
    try {
      const results = await searchSite(userText)
      const answer =
        results.length > 0
          ? `Вот что я нашел:\n- ${results.slice(0, 5).join("\n- ")}`
          : "К сожалению, я ничего не нашел."

      setMessages((prev) => [...prev, { text: answer, isUser: false }])
    } catch (error) {
      console.error("chat search error", error)
      setMessages((prev) => [...prev, { text: "Произошла ошибка при поиске", isUser: false }])
    } finally {
      setLoading(false)
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative w-96 transition-all duration-300">
      <div
        className="bg-white rounded-lg p-4 shadow-lg border border-gray-200 mb-4 relative"
        style={{ maxHeight: `${chatHeight}px` }}
      >
        <div className="absolute bottom-0 right-4 w-4 h-4 bg-white transform rotate-45 translate-y-2"></div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            Чат с помощником
          </h3>
        </div>

        <div className="overflow-y-auto space-y-3 mb-4" style={{ maxHeight: `${chatHeight - 120}px` }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${
                msg.isUser ? "bg-blue-600 text-white ml-auto" : "bg-gray-100 text-gray-800 mr-auto"
              } rounded-lg p-3 max-w-[80%] animate-in fade-in slide-in-from-bottom-2`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>Поиск...</span>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Введите сообщение..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

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
              <ChatComponent />

              <div className="flex justify-start mt-4">
                <div className="pointer-events-none">
                  <Image src="/images/robot-assistant.svg" alt="Виртуальный помощник" width={300} height={300} />
                </div>
              </div>
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
