"use client"

import type React from "react"
import Image from "next/image"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, User, X, Minimize2, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: React.ReactNode
  role: "user" | "assistant"
  timestamp: Date
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Здравствуйте! Я виртуальный помощник портала E-Davis. Чем могу помочь?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isMinimized, setIsMinimized] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // temporary typing message
    const typingId = `typing-${Date.now()}`
    setMessages((prev) => [
      ...prev,
      {
        id: typingId,
        content: "Ищу информацию...",
        role: "assistant",
        timestamp: new Date(),
      },
    ])

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(userMessage.content.toString())}`)
      const data = await res.json()

      let hasResults = data.services.length || data.news.length || data.jobs.length
      let content: React.ReactNode = hasResults ? (
        <div className="space-y-2">
          <p>Вот что я нашел:</p>
          {data.services.length > 0 && (
            <div>
              <p className="font-medium">Услуги:</p>
              <ul className="list-disc list-inside">
                {data.services.map((s: any) => (
                  <li key={s.id}>{s.title}</li>
                ))}
              </ul>
            </div>
          )}
          {data.news.length > 0 && (
            <div>
              <p className="font-medium">Новости:</p>
              <ul className="list-disc list-inside">
                {data.news.map((n: any) => (
                  <li key={n.id}>{n.title}</li>
                ))}
              </ul>
            </div>
          )}
          {data.jobs.length > 0 && (
            <div>
              <p className="font-medium">Вакансии:</p>
              <ul className="list-disc list-inside">
                {data.jobs.map((j: any) => (
                  <li key={j.id}>{j.title}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        "К сожалению, ничего не найдено."
      )

      setMessages((prev) => [
        ...prev.filter((m) => m.id !== typingId),
        {
          id: Date.now().toString(),
          content,
          role: "assistant",
          timestamp: new Date(),
        },
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== typingId),
        {
          id: Date.now().toString(),
          content: "Произошла ошибка при поиске.",
          role: "assistant",
          timestamp: new Date(),
        },
      ])
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen && (
        <Card className={cn("w-full transition-all duration-300", isMinimized ? "h-[60px]" : "h-[500px]")}>
          <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xl flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              Виртуальный помощник
            </CardTitle>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => setIsMinimized(!isMinimized)} className="h-8 w-8">
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setMessages([
                    {
                      id: "1",
                      content: "Здравствуйте! Я виртуальный помощник портала E-Davis. Чем могу помочь?",
                      role: "assistant",
                      timestamp: new Date(),
                    },
                  ])
                }}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="p-4 overflow-y-auto h-[360px]">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex items-start gap-3 animate-in fade-in-0 slide-in-from-bottom-2",
                        message.role === "user" ? "justify-end" : "justify-start",
                      )}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>DS</AvatarFallback>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        </Avatar>
                      )}

                      <div
                        className={cn(
                          "rounded-lg px-3 py-2 max-w-[80%]",
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                        )}
                      >
                        {message.content}
                      </div>

                      {message.role === "user" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                  <Input
                    placeholder="Введите сообщение..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Отправить</span>
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}

      <button onClick={() => setIsOpen(!isOpen)} className="relative flex items-end justify-end">
        <div
          className={`absolute -top-10 right-0 bg-[#FC8C1F] text-white px-3 py-1 rounded-full ${isOpen ? "hidden" : "block"}`}
        >
          👋
        </div>
        <Image
          src="/images/robot-assistant.svg"
          alt="Виртуальный помощник"
          width={120}
          height={120}
          className="cursor-pointer"
        />
      </button>
    </div>
  )
}
