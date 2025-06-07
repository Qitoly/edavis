import type { Metadata } from "next"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllNews } from "@/lib/news"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, Search, Tag } from "lucide-react"

export const metadata: Metadata = {
  title: "Новости - E-Davis",
  description: "Актуальные новости и события E-Davis",
}

export default async function NewsPage() {
  const news = await getAllNews()

  // Group news by category
  const newsByCategory: Record<string, typeof news> = {}

  news.forEach((item) => {
    if (!newsByCategory[item.category]) {
      newsByCategory[item.category] = []
    }

    newsByCategory[item.category].push(item)
  })

  const categories = Object.keys(newsByCategory)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white drop-shadow mb-2">Новости</h1>
          <p className="text-slate-300">Актуальные новости и события E-Davis</p>
        </div>

      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8 flex flex-wrap h-auto bg-slate-800/50 rounded-lg p-1">
          <TabsTrigger value="all">Все новости</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 gap-8">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-br from-blue-700 to-purple-700 text-white rounded-xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 hover:ring-2 hover:ring-blue-300"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <Image
                      src={item.imageUrl || "/placeholder.svg?height=300&width=400"}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-r-none"
                    />
                  </div>
                  <div className="md:col-span-2 flex flex-col p-6">
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2 text-slate-300">
                        <span className="text-sm flex items-center">
                          <Tag className="h-3 w-3 mr-1" /> {item.category}
                        </span>
                        <span className="text-sm flex items-center">
                          <Calendar className="h-3 w-3 mr-1" /> {formatDate(item.publishedAt)}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold drop-shadow">{item.title}</h2>
                    </div>
                    <p className="text-slate-200 flex-grow">{item.summary}</p>
                    <div className="pt-2 flex justify-between items-center text-slate-300">
                      <span className="text-sm">Автор: {item.author}</span>
                      <Link href={`/news/${item.id}`} className="underline flex items-center gap-1 hover:text-blue-300">
                        Читать полностью <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 gap-8">
              {newsByCategory[category].map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-blue-700 to-purple-700 text-white rounded-xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 hover:ring-2 hover:ring-blue-300"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <Image
                        src={item.imageUrl || "/placeholder.svg?height=300&width=400"}
                        alt={item.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-r-none"
                      />
                    </div>
                    <div className="md:col-span-2 flex flex-col p-6">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2 text-slate-300">
                          <span className="text-sm flex items-center">
                            <Tag className="h-3 w-3 mr-1" /> {item.category}
                          </span>
                          <span className="text-sm flex items-center">
                            <Calendar className="h-3 w-3 mr-1" /> {formatDate(item.publishedAt)}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold drop-shadow">{item.title}</h2>
                      </div>
                      <p className="text-slate-200 flex-grow">{item.summary}</p>
                      <div className="pt-2 flex justify-between items-center text-slate-300">
                        <span className="text-sm">Автор: {item.author}</span>
                        <Link href={`/news/${item.id}`} className="underline flex items-center gap-1 hover:text-blue-300">
                          Читать полностью <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
