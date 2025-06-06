import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Keep a single instance to avoid GoTrue warnings in the browser
let browserClient: ReturnType<typeof createSupabaseClient> | null = null

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    // Return a mock client for development
    return {
      from: () => ({
        select: () => ({
          order: () => ({
            limit: () => ({
              data: null,
              error: new Error("Supabase credentials not available"),
            }),
          }),
          eq: () => ({
            single: () => ({
              data: null,
              error: new Error("Supabase credentials not available"),
            }),
          }),
        }),
        insert: () => ({
          select: () => ({
            data: null,
            error: new Error("Supabase credentials not available"),
          }),
        }),
        update: () => ({
          eq: () => ({
            data: null,
            error: new Error("Supabase credentials not available"),
          }),
        }),
        delete: () => ({
          eq: () => ({
            data: null,
            error: new Error("Supabase credentials not available"),
          }),
        }),
      }),
      auth: {
        signUp: () => Promise.resolve({ data: null, error: new Error("Supabase credentials not available") }),
        signIn: () => Promise.resolve({ data: null, error: new Error("Supabase credentials not available") }),
        signOut: () => Promise.resolve({ error: new Error("Supabase credentials not available") }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      },
    } as any
  }

  if (browserClient) return browserClient

  browserClient = createSupabaseClient(supabaseUrl, supabaseKey)
  return browserClient
}
