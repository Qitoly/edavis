import type { Job } from "@/types/job"
import { createClient } from "@/lib/supabase/client"

let allJobsCache: Job[] | null = null

export async function getLatestJobs(limit = 5): Promise<Job[]> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching latest jobs:", error)
      return getMockLatestJobs(limit)
    }

    return data as Job[]
  } catch (error) {
    console.error("Error fetching latest jobs:", error)
    return getMockLatestJobs(limit)
  }
}

export async function getJobById(id: string): Promise<Job | null> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.from("jobs").select("*").eq("id", id).single()

    if (error) {
      console.error(`Error fetching job with id ${id}:`, error)
      return null
    }

    return data as Job
  } catch (error) {
    console.error(`Error fetching job with id ${id}:`, error)
    return null
  }
}

export async function getAllJobs(): Promise<Job[]> {
  if (allJobsCache) return allJobsCache
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("published_at", { ascending: false })

    if (error) {
      console.error("Error fetching all jobs:", error)
      allJobsCache = getMockJobs()
      return allJobsCache
    }

    allJobsCache = data as Job[]
    return allJobsCache
  } catch (error) {
    console.error("Error fetching all jobs:", error)
    allJobsCache = getMockJobs()
    return allJobsCache
  }
}

// Mock data for development or fallback
function getMockLatestJobs(limit: number): Job[] {
  return getMockJobs().slice(0, limit)
}

function getMockJobs(): Job[] {
  return [
    {
      id: "1",
      title: "Специалист по обслуживанию клиентов",
      department: "Департамент государственных услуг",
      location: "г. Дэвис, ул. Центральная, 10",
      description:
        "Консультирование граждан по вопросам получения государственных услуг, прием и обработка заявлений, работа с документами.",
      requirements:
        "Высшее образование, опыт работы с клиентами от 1 года, знание законодательства в сфере государственных услуг, уверенный пользователь ПК.",
      salary: "30000-40000",
      type: "Полная занятость",
      published_at: new Date("2023-11-15"),
      deadline: new Date("2023-12-15"),
      contactEmail: "hr@E-Davis.gov",
      contactPhone: "+7 (123) 456-78-90",
    },
    {
      id: "2",
      title: "Разработчик программного обеспечения",
      department: "Департамент цифрового развития",
      location: "г. Дэвис, ул. Технологическая, 5",
      description:
        "Разработка и поддержка программного обеспечения для государственных информационных систем, участие в проектах по цифровизации государственных услуг.",
      requirements:
        "Высшее техническое образование, опыт разработки на JavaScript/TypeScript от 2 лет, знание React, Node.js, опыт работы с базами данных.",
      salary: "70000-90000",
      type: "Полная занятость",
      published_at: new Date("2023-11-10"),
      deadline: new Date("2023-12-10"),
      contactEmail: "it@E-Davis.gov",
      contactPhone: "+7 (123) 456-78-91",
    },
    {
      id: "3",
      title: "Юрист",
      department: "Департамент юридического обеспечения",
      location: "г. Дэвис, ул. Правовая, 15",
      description:
        "Правовое сопровождение деятельности государственных органов, подготовка юридических заключений, представление интересов в суде.",
      requirements:
        "Высшее юридическое образование, опыт работы от 3 лет, знание административного и гражданского права, опыт представления интересов в суде.",
      salary: "50000-70000",
      type: "Полная занятость",
      published_at: new Date("2023-11-05"),
      deadline: new Date("2023-12-05"),
      contactEmail: "legal@E-Davis.gov",
      contactPhone: "+7 (123) 456-78-92",
    },
    {
      id: "4",
      title: "Специалист по связям с общественностью",
      department: "Департамент информационной политики",
      location: "г. Дэвис, ул. Медийная, 7",
      description:
        "Взаимодействие со СМИ, подготовка пресс-релизов и информационных материалов, организация пресс-конференций и брифингов.",
      requirements:
        "Высшее образование в сфере журналистики или PR, опыт работы от 2 лет, навыки написания текстов, знание принципов работы СМИ.",
      salary: "40000-60000",
      type: "Полная занятость",
      published_at: new Date("2023-10-25"),
      deadline: new Date("2023-11-25"),
      contactEmail: "pr@E-Davis.gov",
      contactPhone: "+7 (123) 456-78-93",
    },
    {
      id: "5",
      title: "Аналитик данных",
      department: "Департамент цифрового развития",
      location: "г. Дэвис, ул. Технологическая, 5",
      description:
        "Анализ данных о предоставлении государственных услуг, подготовка аналитических отчетов, разработка рекомендаций по улучшению качества услуг.",
      requirements:
        "Высшее образование в области математики, статистики или информационных технологий, опыт работы с большими данными от 2 лет, знание SQL, Python, инструментов визуализации данных.",
      salary: "60000-80000",
      type: "Полная занятость",
      published_at: new Date("2023-10-20"),
      deadline: new Date("2023-11-20"),
      contactEmail: "analytics@E-Davis.gov",
      contactPhone: "+7 (123) 456-78-94",
    },
  ]
}
