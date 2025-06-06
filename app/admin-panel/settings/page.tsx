"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase/singleton-client"
import AuthGuard from "@/components/auth-guard"

export default function PortalSettingsPage() {
  const [questionLink, setQuestionLink] = useState("")
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const supabase = getSupabaseClient()
        const { data, error } = await supabase
          .from("portal_settings")
          .select("*")
          .limit(1)
          .single()

        if (!error && data) {
          setQuestionLink(data.question_link || "")
        }
      } catch (e) {
        console.error("Error loading settings:", e)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase.from("portal_settings").upsert(
        { id: 1, question_link: questionLink, updated_at: new Date().toISOString() },
        { onConflict: "id" }
      )

      if (error) throw error
    } catch (e: any) {
      console.error("Error updating settings:", e)
      setError(e.message || "Не удалось сохранить настройки")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <AuthGuard requiredRoles={["owner", "admin"]}>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Link href="/admin-panel" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к панели управления
          </Link>

          <Card>
            <CardHeader>
              <CardTitle>Настройки портала</CardTitle>
              <CardDescription>Измените общие настройки портала</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="questionLink">Ссылка для кнопки &quot;Задать вопрос&quot;</Label>
                  <Input
                    id="questionLink"
                    type="url"
                    value={questionLink}
                    onChange={(e) => setQuestionLink(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Сохранение...
                    </>
                  ) : (
                    "Сохранить"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </AuthGuard>
  )
}
