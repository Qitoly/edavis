"use client"

import type React from "react"

import { use, useEffect, useState } from "react"
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

export default function EditServicePage({ params }: any) {

  const { id } = use(params) as { id: string }

  const [service, setService] = useState<any>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState("")
  const [requirements, setRequirements] = useState("")
  const [procedure, setProcedure] = useState("")
  const [department, setDepartment] = useState("")
  const [cost, setCost] = useState("")
  const [applyUrl, setApplyUrl] = useState("")
  const [centers, setCenters] = useState<string[]>(["", "", ""])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchService = async () => {
      try {
        const supabase = getSupabaseClient()

        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("id", id)
          .single<{
            id: string
            title: string
            description: string
            duration: string
            requirements: string
            procedure: string
            department: string
            cost: string
            apply_url: string | null
            centers: string[] | null
          }>()

        if (error) {
          console.error(
            "Error fetching service:",
            error?.message || error
          )
          setError("Услуга не найдена")
          return
        }

        setService(data)
        setTitle(data.title || "")
        setDescription(data.description || "")
        setDuration(data.duration || "")
        setRequirements(data.requirements || "")
        setProcedure(data.procedure || "")
        setDepartment(data.department || "")
        setCost(data.cost || "")
        setApplyUrl(data.apply_url || "")
        setCenters(
          data.centers && Array.isArray(data.centers)
            ? [data.centers[0] || "", data.centers[1] || "", data.centers[2] || ""]
            : ["", "", ""]
        )

      } catch (error: any) {
        console.error(
          "Error fetching service:",
          error?.message || error
        )

        setError("Произошла ошибка при загрузке услуги")
      } finally {
        setLoading(false)
      }
    }

    fetchService()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const supabase = getSupabaseClient()

      const { error } = await supabase
        .from("services")
        .update({
          title,
          description,
          duration,
          requirements,
          procedure,
        department,
        cost,
        centers: centers.filter((c) => c.trim().length > 0),
        apply_url: applyUrl || null,
        updated_at: new Date().toISOString(),
      })
        .eq("id", id)

      if (error) {
        throw error
      }

      router.push("/admin-panel/services")
      router.refresh()
    } catch (error: any) {
      const message = error?.message || "Произошла ошибка при обновлении услуги"
      console.error("Error updating service:", message)
      setError(message)
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

  if (error && !service) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/admin-panel/services"
            className="flex items-center text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к списку услуг
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
          <Link
            href="/admin-panel/services"
            className="flex items-center text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к списку услуг
          </Link>

          <Card>
            <CardHeader>
              <CardTitle>Редактирование услуги</CardTitle>
              <CardDescription>Измените информацию об услуге</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Название услуги</Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Ответственный департамент</Label>
                      <Input
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                      />
                    </div>

                  <div className="space-y-2">
                    <Label htmlFor="cost">Стоимость</Label>
                    <Input id="cost" type="text" value={cost} onChange={(e) => setCost(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="applyUrl">Ссылка для онлайн-заявления</Label>
                    <Input
                      id="applyUrl"
                      type="url"
                      value={applyUrl}
                      onChange={(e) => setApplyUrl(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="center1">Центр 1</Label>
                    <Input
                      id="center1"
                      value={centers[0]}
                      onChange={(e) =>
                        setCenters([e.target.value, centers[1], centers[2]])
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="center2">Центр 2 (необязательно)</Label>
                    <Input
                      id="center2"
                      value={centers[1]}
                      onChange={(e) =>
                        setCenters([centers[0], e.target.value, centers[2]])
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="center3">Центр 3 (необязательно)</Label>
                    <Input
                      id="center3"
                      value={centers[2]}
                      onChange={(e) =>
                        setCenters([centers[0], centers[1], e.target.value])
                      }
                    />
                  </div>
                </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Срок оказания услуги</Label>
                    <Input
                      id="duration"
                      placeholder="Например: 30 дней"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Требования</Label>
                    <Textarea
                      id="requirements"
                      rows={3}
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="procedure">Процедура получения</Label>
                    <Textarea
                      id="procedure"
                      rows={3}
                      value={procedure}
                      onChange={(e) => setProcedure(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" asChild>
                  <Link href="/admin-panel/services">Отмена</Link>
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
