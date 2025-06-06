import { createClient } from "@/lib/supabase/client"

export interface PortalSettings {
  id: number
  question_link: string | null
}

export async function getPortalSettings(): Promise<PortalSettings | null> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("portal_settings")
      .select("*")
      .limit(1)
      .single()

    if (error) {
      console.error("Error fetching portal settings:", error)
      return null
    }

    return data as PortalSettings
  } catch (error) {
    console.error("Error fetching portal settings:", error)
    return null
  }
}
