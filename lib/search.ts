import { getAllServices } from "@/lib/services"
import { getAllFaqs } from "@/lib/faq"
import { getAllNews } from "@/lib/news"
import { getAllJobs } from "@/lib/jobs"

export interface SearchResult {
  id: string
  title: string
  link: string
}

/**
 * Search across services, news, jobs and FAQs.
 * Returns an array of search results with links.
 */
export async function searchSite(query: string): Promise<SearchResult[]> {
  const q = query.toLowerCase()
  try {
    const [services, news, jobs, faqs] = await Promise.all([
      getAllServices(),
      getAllNews(),
      getAllJobs(),
      getAllFaqs(),
    ])

    const results: SearchResult[] = []

    services.forEach((s) => {
      if (s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) {
        results.push({
          id: s.id,
          title: `Услуга: ${s.title}`,
          link: `/services/${s.id}`,
        })
      }
    })

    news.forEach((n) => {
      if (n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q)) {
        results.push({
          id: n.id,
          title: `Новость: ${n.title}`,
          link: "/news",
        })
      }
    })

    jobs.forEach((j) => {
      if (j.title.toLowerCase().includes(q) || j.description.toLowerCase().includes(q)) {
        results.push({
          id: j.id,
          title: `Вакансия: ${j.title}`,
          link: "/jobs",
        })
      }
    })

    faqs.forEach((f) => {
      if (f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)) {
        results.push({
          id: f.id,
          title: `FAQ: ${f.question}`,
          link: "/faq",
        })
      }
    })

    return results
  } catch (error) {
    console.error('searchSite error:', error)
    return []
  }
}
