import { NextResponse, type NextRequest } from 'next/server'
import { getAllServices } from '@/lib/services'
import { getAllNews } from '@/lib/news'
import { getAllJobs } from '@/lib/jobs'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = (searchParams.get('q') || '').toLowerCase()

  if (!query) {
    return NextResponse.json({ services: [], news: [], jobs: [] })
  }

  const [services, news, jobs] = await Promise.all([
    getAllServices(),
    getAllNews(),
    getAllJobs(),
  ])

  const filter = (text: string) => text.toLowerCase().includes(query)

  const foundServices = services.filter(
    s => filter(s.title) || filter(s.description)
  ).slice(0, 3)

  const foundNews = news.filter(
    n => filter(n.title) || filter(n.summary)
  ).slice(0, 3)

  const foundJobs = jobs.filter(
    j => filter(j.title) || filter(j.description)
  ).slice(0, 3)

  return NextResponse.json({ services: foundServices, news: foundNews, jobs: foundJobs })
}
