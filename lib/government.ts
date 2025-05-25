import { createClient } from "@/lib/supabase/server"
import type { GovernmentMember } from "@/types/government-member"

export async function getGovernmentMembers(): Promise<GovernmentMember[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("government_members")
    .select("*")
    .order("order_number", { ascending: true })

  if (error) {
    console.error("Ошибка при получении членов правительства:", error)
    return []
  }

  return data || []
}

export async function getGovernmentMemberById(id: number): Promise<GovernmentMember | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("government_members").select("*").eq("id", id).single()

  if (error) {
    console.error("Ошибка при получении члена правительства:", error)
    return null
  }

  return data
}

export async function getGovernor(): Promise<GovernmentMember | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("government_members").select("*").eq("is_governor", true).single()

  if (error) {
    console.error("Ошибка при получении губернатора:", error)
    return null
  }

  return data
}

export async function getNonGovernorMembers(): Promise<GovernmentMember[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("government_members")
    .select("*")
    .eq("is_governor", false)
    .order("order_number", { ascending: true })

  if (error) {
    console.error("Ошибка при получении членов правительства:", error)
    return []
  }

  return data || []
}
