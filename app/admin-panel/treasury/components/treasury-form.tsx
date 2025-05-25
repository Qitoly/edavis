"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { createTreasuryEntry, updateTreasuryEntry } from "@/lib/treasury"
import type { Treasury } from "@/types/treasury"
import { DollarSign, Calendar, MessageSquare, Save, X } from "lucide-react"

const treasuryFormSchema = z.object({
  amount: z.coerce.number().positive("Сумма должна быть положительным числом"),
  date: z.string().min(1, "Дата обязательна"),
  comment: z.string().optional(),
})

type TreasuryFormValues = z.infer<typeof treasuryFormSchema>

interface TreasuryFormProps {
  initialData?: Treasury | null
}

export function TreasuryForm({ initialData }: TreasuryFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<TreasuryFormValues>({
    resolver: zodResolver(treasuryFormSchema),
    defaultValues: {
      amount: initialData?.amount || 0,
      date: initialData?.date
        ? new Date(initialData.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      comment: initialData?.comment || "",
    },
  })

  async function onSubmit(data: TreasuryFormValues) {
    setIsLoading(true)
    try {
      if (initialData) {
        await updateTreasuryEntry(initialData.id, data)
        toast({
          title: "Запись обновлена",
          description: "Запись о казне успешно обновлена",
        })
      } else {
        await createTreasuryEntry(data)
        toast({
          title: "Запись создана",
          description: "Новая запись о казне успешно создана",
        })
      }
      router.push("/admin-panel/treasury")
      router.refresh()
    } catch (error) {
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Произошла ошибка",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          {initialData ? "Редактировать запись" : "Создать новую запись"}
        </CardTitle>
        <CardDescription>
          {initialData ? "Обновите информацию о состоянии казны" : "Добавьте новую запись о состоянии казны"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Сумма
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input type="number" step="0.01" placeholder="1000000.00" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>Введите текущую сумму в казне</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Дата
                  </FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>Дата записи</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Комментарий
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Комментарий к записи..." {...field} />
                  </FormControl>
                  <FormDescription>Необязательный комментарий к записи</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin-panel/treasury")}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Отмена
              </Button>
              <Button type="submit" disabled={isLoading} className="flex items-center gap-2">
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Сохранение...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {initialData ? "Обновить" : "Создать"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
