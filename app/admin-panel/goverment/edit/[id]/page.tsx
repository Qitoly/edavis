"use client"

import type React from "react"

import { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase/singleton-client"
import type { GovernmentMemberFormData, GovernmentMember } from "@/types/government-member"
import AuthGuard from "@/components/auth-guard"

export default function EditGovernmentMemberPage({ params }: any) {
  const { id: idStr } = use(params) as { id: string }
  const id = Number.parseInt(idStr)
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<GovernmentMemberFormData>({
    full_name: "",
    position: "",
    department: "",
    photo_url: "",
    is_governor: false,
    order_number: 0,
  })

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const supabase = getSupabaseClient()
        const { data, error } = await supabase
          .from("government_members")
          .select("*")
          .eq("id", id)
          .single<GovernmentMember>()

        if (error) {
          throw error
        }

        if (data) {
          setFormData({
            full_name: data.full_name,
            position: data.position,
            department: data.department,
            photo_url: data.photo_url,
            is_governor: data.is_governor,
            order_number: data.order_number,
          })
        }
      } catch (error: any) {
        console.error(
          "Error fetching government member:",
          error?.message || error
        )
        toast({
          title: "Ошибка",
          description: error.message || "Не удалось загрузить данные члена правительства",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchMember()
  }, [id, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: Number.parseInt(value) || 0,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const supabase = getSupabaseClient()

      const { error } = await supabase
        .from("government_members")
        .update(formData as any)
        .eq("id", id)

      if (error) {
        throw error
      }

      toast({
        title: "Успешно",
        description: "Информация о члене правительства обновлена",
      })

      router.push("/admin-panel/government")
      router.refresh()
    } catch (error: any) {
      const message =
        error?.message ||
        "Не удалось обновить информацию о члене правительства"
      console.error("Error updating government member:", message)
      toast({
        title: "Ошибка",
        description: message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <AuthGuard>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Редактировать члена правительства</h1>

        <Card>
          <CardHeader>
            <CardTitle>Редактирование</CardTitle>
            <CardDescription>Измените информацию о члене правительства</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="full_name">ФИО</Label>
                  <Input id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Должность</Label>
                  <Input id="position" name="position" value={formData.position} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Департамент</Label>
                  <Input
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo_url">URL фотографии</Label>
                  <Input
                    id="photo_url"
                    name="photo_url"
                    value={formData.photo_url || ""}
                    onChange={handleChange}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order_number">Порядковый номер</Label>
                  <Input
                    id="order_number"
                    name="order_number"
                    type="number"
                    value={formData.order_number}
                    onChange={handleNumberChange}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <Checkbox
                    id="is_governor"
                    name="is_governor"
                    checked={formData.is_governor}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_governor: checked === true }))}
                  />
                  <Label htmlFor="is_governor">Губернатор</Label>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin-panel/government")}
                  disabled={isSubmitting}
                >
                  Отмена
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
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  )
}
