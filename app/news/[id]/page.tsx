import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getNewsById } from "@/lib/news"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar } from "lucide-react"

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const news = await getNewsById(params.id)
  if (!news) {
    return { title: "Новость не найдена - E-Davis" }
  }
  return {
    title: `${news.title} - E-Davis`,
    description: news.summary,
  }
}

export default async function NewsItemPage({ params }: any) {
  const news = await getNewsById(params.id)
  if (!news) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/news" className="flex items-center text-slate-300 hover:text-white mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад к новостям
      </Link>
      <div className="bg-gradient-to-br from-blue-700 to-purple-700 text-white rounded-xl shadow-xl overflow-hidden">
        {news.imageUrl && (
          <Image src={news.imageUrl} alt={news.title} width={800} height={400} className="w-full h-64 object-cover" />
        )}
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold drop-shadow">{news.title}</h1>
          <div className="flex items-center gap-2 text-slate-300 text-sm">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(news.publishedAt)}</span>
            <span className="ml-auto">{news.author}</span>
          </div>
          <p className="whitespace-pre-line text-slate-200">{news.content}</p>
        </div>
      </div>
    </div>
  )
}
