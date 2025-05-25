"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, ArrowLeft, Loader2, Save } from "lucide-react"
import Link from "next/link"
import AuthGuard from "@/components/auth-guard"
import { updateUser, getUserById } from "../../actions"
import { useToast } from "@/hooks/use-toast"

interface EditUserPageProps {
  params: {
    id: string
  }
}

export default function EditUserPage({ params }: EditUserPageProps) {
  const [user, setUser] = useState<any>(null)
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(params.id)
        if (userData) {
          setUser(userData)
          setName(userData.name || "")
          setRole(userData.role || "moderator")
        } else {
          setError("Пользователь не найден")
        }
      } catch (error) {
        setError("Ошибка при загрузке данных пользователя")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("role", role)

      const result = await updateUser(params.id, formData)

      if (result.error) {
        setError(result.error)
        toast({
          title: "Ошибка",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      if (result.success) {
        toast({
          title: "Успешно!",
          description: "Данные пользователя обновлены",
          variant: "default",
        })

        // Redirect after a short delay to show the toast
        setTimeout(() => {
          router.push("/admin-panel/users")
          router.refresh()
        }, 1000)
      }
    } catch (error: any) {
      console.error("Error updating user:", error)
      const errorMessage = error.message || "Произошла ошибка при обновлении пользователя"
      setError(errorMessage)
      toast({
        title: "Ошибка",
        description: errorMessage,
        variant: "destructive",
      })
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

  if (!user) {
    return (
      <AuthGuard requiredRoles={["owner"]}>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Пользователь не найден</AlertDescription>
            </Alert>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard requiredRoles={["owner"]}>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/admin-panel/users"
            className="flex items-center text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к списку пользователей
          </Link>

          <Card>
            <CardHeader>
              <CardTitle>Редактирование пользователя</CardTitle>
              <CardDescription>Изменение данных пользователя {user.name}</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="role">Роль</Label>
                    <Select value={role} onValueChange={(value) => setRole(value)} disabled={isSubmitting}>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Выберите роль" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Администратор</SelectItem>
                        <SelectItem value="moderator">Модератор</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" asChild disabled={isSubmitting}>
                  <Link href="/admin-panel/users">Отмена</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Сохранение...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Сохранить изменения
                    </>
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
