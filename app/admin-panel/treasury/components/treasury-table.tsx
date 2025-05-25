"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { deleteTreasuryEntry } from "@/lib/treasury"
import type { Treasury } from "@/types/treasury"
import { DeleteTreasuryButton } from "./delete-treasury-button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, MessageSquare, Plus } from "lucide-react"

interface TreasuryTableProps {
  treasuryData: Treasury[]
}

export function TreasuryTable({ treasuryData }: TreasuryTableProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState<number | null>(null)

  const handleDelete = async (id: number) => {
    setIsDeleting(id)
    try {
      await deleteTreasuryEntry(id)
      toast({
        title: "Запись удалена",
        description: "Запись о казне успешно удалена",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Произошла ошибка при удалении",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Записи о казне
          </CardTitle>
          <CardDescription>Управление записями о состоянии казны</CardDescription>
        </div>
        <Button asChild>
          <Link href="/admin-panel/treasury/create" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Добавить запись
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Дата
                  </div>
                </TableHead>
                <TableHead className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <DollarSign className="h-4 w-4" />
                    Сумма
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Комментарий
                  </div>
                </TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {treasuryData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <DollarSign className="h-8 w-8" />
                      <p>Нет записей о казне</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                treasuryData
                  .slice()
                  .reverse()
                  .map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">
                        <Badge variant="outline">#{entry.id}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(entry.date).toLocaleDateString("ru-RU", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-semibold text-green-600">{entry.amount.toLocaleString("ru-RU")}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {entry.comment ? (
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            <span className="truncate max-w-[200px]" title={entry.comment}>
                              {entry.comment}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin-panel/treasury/edit/${entry.id}`}>Редактировать</Link>
                          </Button>
                          <DeleteTreasuryButton
                            id={entry.id}
                            onDelete={() => handleDelete(entry.id)}
                            isDeleting={isDeleting === entry.id}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
