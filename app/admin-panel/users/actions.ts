"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

// Create admin client with service role key for user management
function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export async function createUser(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string
    const role = formData.get("role") as string

    if (!email || !password || !name || !role) {
      return { error: "Все поля обязательны для заполнения" }
    }

    // Use admin client for user creation
    const adminClient = createAdminClient()

    // Create user with admin privileges
    const { data: userData, error: userError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (userError) {
      console.error("User creation error:", userError)
      return { error: userError.message || "Ошибка при создании пользователя" }
    }

    if (!userData.user) {
      return { error: "Не удалось создать пользователя" }
    }

    // Create profile for the user using admin client
    const { error: profileError } = await adminClient.from("profiles").insert({
      id: userData.user.id,
      name,
      role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (profileError) {
      console.error("Profile creation error:", profileError)
      // Try to delete the created user if profile creation fails
      await adminClient.auth.admin.deleteUser(userData.user.id)
      return { error: "Ошибка при создании профиля пользователя" }
    }

    revalidatePath("/admin-panel/users")
    return { success: true }
  } catch (error: any) {
    console.error("Error creating user:", error)
    return { error: error.message || "Произошла ошибка при создании пользователя" }
  }
}

export async function getUsers() {
  try {
    const adminClient = createAdminClient()

    // Get all users from profiles table
    const { data: profiles, error } = await adminClient.from("profiles").select("*").order("role", { ascending: false })

    if (error) {
      console.error("Error fetching users:", error)
      return []
    }

    return profiles || []
  } catch (error: any) {
    console.error("Error fetching users:", error)
    return []
  }
}

export async function updateUser(userId: string, formData: FormData) {
  try {
    const adminClient = createAdminClient()

    const name = formData.get("name") as string
    const role = formData.get("role") as string

    if (!name || !role) {
      return { error: "Все поля обязательны для заполнения" }
    }

    // Update profile
    const { error: profileError } = await adminClient
      .from("profiles")
      .update({
        name,
        role,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)

    if (profileError) {
      console.error("Profile update error:", profileError)
      return { error: "Ошибка при обновлении профиля пользователя" }
    }

    revalidatePath("/admin-panel/users")
    return { success: true }
  } catch (error: any) {
    console.error("Error updating user:", error)
    return { error: error.message || "Произошла ошибка при обновлении пользователя" }
  }
}

export async function deleteUser(userId: string) {
  try {
    const adminClient = createAdminClient()

    // Delete user profile first
    const { error: profileError } = await adminClient.from("profiles").delete().eq("id", userId)

    if (profileError) {
      console.error("Profile deletion error:", profileError)
      return { error: "Ошибка при удалении профиля пользователя" }
    }

    // Delete user from auth
    const { error: userError } = await adminClient.auth.admin.deleteUser(userId)

    if (userError) {
      console.error("User deletion error:", userError)
      return { error: "Ошибка при удалении пользователя" }
    }

    revalidatePath("/admin-panel/users")
    return { success: true }
  } catch (error: any) {
    console.error("Error deleting user:", error)
    return { error: error.message || "Произошла ошибка при удалении пользователя" }
  }
}

export async function getUserById(userId: string) {
  try {
    const adminClient = createAdminClient()

    const { data: profile, error } = await adminClient
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single<{
        id: string
        name: string | null
        email: string | null
        role: string
      }>()

    if (error) {
      console.error("Error fetching user:", error)
      return null
    }

    return profile
  } catch (error: any) {
    console.error("Error fetching user:", error)
    return null
  }
}
