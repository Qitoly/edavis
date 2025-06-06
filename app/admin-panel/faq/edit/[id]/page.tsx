"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase/singleton-client"
import AuthGuard from "@/components/auth-guard"

export default function EditFaqPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const supabase = getSupabaseClient()

        const { data, error } = await supabase.from("faq").select("*").eq("id", id).single()

        if (error) {
          setError("Вопрос не найден")
          return
        }

        setQuestion(data.question || "")
        setAnswer(data.answer || "")
      } catch (error) {
        console.error("Error:", error)
        setError("Произошла ошибка при загрузке вопроса")
      } finally {
        setLoading(false)
      }
    }

    fetchFaq()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const supabase = getSupabaseClient()

      const { error } = await supabase
        .from("faq")
        .update({
          question,
          answer,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)

      if (error) {
        throw error
      }

      router.push("/admin-panel/faq")
      router.refresh()
    } catch (error: any) {
      console.error("Error updating faq:", error)
      setError(error.message || "Произошла ошибка при обновлении вопроса")
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

  if (error && !question) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Link href="/admin-panel/faq" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к списку вопросов
          </Link>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <AuthGuard requiredRoles={["owner", "admin"]}>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Link href="/admin-panel/faq" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к списку вопросов
          </Link>

          <Card>
            <CardHeader>
              <CardTitle>Редактирование вопроса</CardTitle>
              <CardDescription>Измените информацию о вопросе</CardDescription>
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
                  <Label htmlFor="question">Вопрос</Label>
                  <Input id="question" value={question} onChange={(e) => setQuestion(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="answer">Ответ</Label>
                  <Textarea id="answer" rows={5} value={answer} onChange={(e) => setAnswer(e.target.value)} required />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" asChild>
                  <Link href="/admin-panel/faq">Отмена</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Сохранение...
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
