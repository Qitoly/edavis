"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Edit, Plus } from "lucide-react"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase/singleton-client"
import AuthGuard from "@/components/auth-guard"
import DeleteFaqButton from "./components/delete-faq-button"

export default function FaqAdminPage() {
  const [faqs, setFaqs] = useState<any[]>([])
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFaqsAndRole = async () => {
      try {
        const supabase = getSupabaseClient()
        const { data: sessionData } = await supabase.auth.getSession()
        if (!sessionData.session) return

        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", sessionData.session.user.id)
          .single()

        if (profile) setUserRole(profile.role)

        const { data } = await supabase
          .from("faq")
          .select("*")
          .order("created_at", { ascending: false })

        setFaqs(data || [])
      } catch (error) {
        console.error("Error loading faqs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFaqsAndRole()
  }, [])

  const canEdit = userRole === "owner" || userRole === "admin"

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Link href="/admin-panel" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к панели управления
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Часто задаваемые вопросы</h1>
              <p className="text-muted-foreground">Управление вопросами портала</p>
            </div>
            {canEdit && (
              <Button asChild>
                <Link href="/admin-panel/faq/create">
                  <Plus className="mr-2 h-4 w-4" /> Добавить вопрос
                </Link>
              </Button>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Вопросы</CardTitle>
              <CardDescription>Список всех вопросов</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Вопрос</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faqs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                        Вопросы не найдены
                      </TableCell>
                    </TableRow>
                  ) : (
                    faqs.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.question}</TableCell>
                        <TableCell className="text-right space-x-2">
                          {canEdit && (
                            <Link href={`/admin-panel/faq/edit/${item.id}`}> 
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                          )}
                          {canEdit && <DeleteFaqButton id={item.id} />}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  )
}
