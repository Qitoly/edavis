import { createServerClientLegacy } from "@/lib/supabase/server-client"
import type { Treasury, TreasuryInput } from "@/types/treasury"

export async function getTreasuryData() {
  const supabase = createServerClientLegacy()

  const { data, error } = await supabase.from("treasury").select("*").order("date", { ascending: true })

  if (error) {
    console.error("Error fetching treasury data:", error)
    return []
  }

  return data as Treasury[]
}

export async function getTreasuryEntry(id: number) {
  const supabase = createServerClientLegacy()

  const { data, error } = await supabase.from("treasury").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching treasury entry:", error)
    return null
  }

  return data as Treasury
}

export async function createTreasuryEntry(entry: TreasuryInput) {
  const supabase = createServerClientLegacy()

  const { data, error } = await supabase.from("treasury").insert([entry]).select().single()

  if (error) {
    console.error("Error creating treasury entry:", error)
    throw new Error("Не удалось создать запись о казне")
  }

  return data as Treasury
}

export async function updateTreasuryEntry(id: number, entry: TreasuryInput) {
  const supabase = createServerClientLegacy()

  const { data, error } = await supabase.from("treasury").update(entry).eq("id", id).select().single()

  if (error) {
    console.error("Error updating treasury entry:", error)
    throw new Error("Не удалось обновить запись о казне")
  }

  return data as Treasury
}

export async function deleteTreasuryEntry(id: number) {
  const supabase = createServerClientLegacy()

  const { error } = await supabase.from("treasury").delete().eq("id", id)

  if (error) {
    console.error("Error deleting treasury entry:", error)
    throw new Error("Не удалось удалить запись о казне")
  }

  return true
}
