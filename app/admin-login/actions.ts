"use server"

import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

// Функция входа
export async function login(prevState: any, formData: FormData) {
  // Проверяем, что formData - это объект FormData
  if (!formData || typeof formData.get !== "function") {
    return {
      success: false,
      error: "Ошибка обработки формы",
    }
  }

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return {
      success: false,
      error: "Email и пароль обязательны для заполнения",
    }
  }

  const supabase = await createClient()

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    // Возвращаем успех вместо перенаправления
    return {
      success: true,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Произошла ошибка при входе",
    }
  }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()

  // Очищаем куки для полного выхода
  const cookieStore = await cookies()
  cookieStore.delete("sb-access-token")
  cookieStore.delete("sb-refresh-token")

  return {
    success: true,
  }
}
