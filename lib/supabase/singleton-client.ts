import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Создаем тип для нашего клиента
type SupabaseClient = ReturnType<typeof createSupabaseClient>

// Объявляем переменную для хранения единственного экземпляра клиента
let supabaseClient: SupabaseClient | null = null

// Функция для получения клиента Supabase
export function getSupabaseClient(): SupabaseClient {
  if (supabaseClient === null) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    supabaseClient = createSupabaseClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  }

  return supabaseClient
}
