import { getAllServices } from "@/lib/services"
import { getAllFaqs } from "@/lib/faq"
import { getAllNews } from "@/lib/news"
import { getAllJobs } from "@/lib/jobs"

/**
 * Search across services, news, jobs and FAQs.
 * Returns an array of strings describing found items.
 */
export async function searchSite(query: string): Promise<string[]> {
  const q = query.toLowerCase()
  try {
    const [services, news, jobs, faqs] = await Promise.all([
      getAllServices(),
      getAllNews(),
      getAllJobs(),
      getAllFaqs(),
    ])

    const results: string[] = []

    services.forEach((s) => {
      if (s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) {
        results.push(`Услуга: ${s.title}`)
      }
    })

    news.forEach((n) => {
      if (n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q)) {
        results.push(`Новость: ${n.title}`)
      }
    })

    jobs.forEach((j) => {
      if (j.title.toLowerCase().includes(q) || j.description.toLowerCase().includes(q)) {
        results.push(`Вакансия: ${j.title}`)
      }
    })

    faqs.forEach((f) => {
      if (f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)) {
        results.push(`FAQ: ${f.question}`)
      }
    })

    return results
  } catch (error) {
    console.error('searchSite error:', error)
    return []
  }
}
