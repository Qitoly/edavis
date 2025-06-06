import type { Faq } from "@/types/faq"
import { createClient } from "@/lib/supabase/client"

let allFaqsCache: Faq[] | null = null

export async function getAllFaqs(): Promise<Faq[]> {
  if (allFaqsCache) return allFaqsCache
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("faq")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching faq:", error)
      allFaqsCache = getMockFaqs()
      return allFaqsCache
    }

    allFaqsCache = data.map((item: any) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
      createdAt: new Date(item.created_at),
      updatedAt: new Date(item.updated_at),
    })) as Faq[]
    return allFaqsCache
  } catch (error) {
    console.error("Error fetching faq:", error)
    allFaqsCache = getMockFaqs()
    return allFaqsCache
  }
}

export async function getFaqById(id: string): Promise<Faq | null> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("faq")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.error(`Error fetching faq with id ${id}:`, error)
      return null
    }

    return {
      id: data.id,
      question: data.question,
      answer: data.answer,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    } as Faq
  } catch (error) {
    console.error(`Error fetching faq with id ${id}:`, error)
    return null
  }
}

function getMockFaqs(): Faq[] {
  return [
    {
      id: "1",
      question: "Как получить доступ к услугам портала?",
      answer:
        "Для доступа к услугам необходимо зарегистрироваться и войти в личный кабинет.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      question: "Где узнать статус поданного заявления?",
      answer: "Статус заявлений отображается в разделе 'Мои обращения' вашего кабинета.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
}
