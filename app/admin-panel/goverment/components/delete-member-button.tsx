"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { getSupabaseClient } from "@/lib/supabase/singleton-client"
import { useRouter } from "next/navigation"

interface DeleteMemberButtonProps {
  id: number
}

export default function DeleteMemberButton({ id }: DeleteMemberButtonProps) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const supabase = getSupabaseClient()

      const { error } = await supabase.from("government_members").delete().eq("id", id)

      if (error) {
        throw error
      }

      toast({
        title: "Успешно",
        description: "Член правительства успешно удален",
      })

      router.refresh()
    } catch (error: any) {
      console.error("Error deleting government member:", error)
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось удалить члена правительства",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setOpen(false)
    }
  }

  return (
    <>
      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setOpen(true)}>
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Удалить</span>
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Член правительства будет безвозвратно удален из системы.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                handleDelete()
              }}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Удаление...
                </>
              ) : (
                "Удалить"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
