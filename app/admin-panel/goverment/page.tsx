import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { getGovernmentMembers } from "@/lib/government"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Pencil } from "lucide-react"
import DeleteMemberButton from "./components/delete-member-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AuthGuard from "@/components/auth-guard"

export const dynamic = "force-dynamic"
export const revalidate = 0

async function GovernmentMembersTable() {
  const members = await getGovernmentMembers()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Фото</TableHead>
          <TableHead>ФИО</TableHead>
          <TableHead>Должность</TableHead>
          <TableHead>Департамент</TableHead>
          <TableHead>Губернатор</TableHead>
          <TableHead>Порядок</TableHead>
          <TableHead className="w-[100px] text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
              Нет данных о членах правительства
            </TableCell>
          </TableRow>
        ) : (
          members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                {member.photo_url ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={member.photo_url || "/placeholder.svg"}
                      alt={member.full_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Нет фото</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium">{member.full_name}</TableCell>
              <TableCell>{member.position}</TableCell>
              <TableCell>{member.department}</TableCell>
              <TableCell>{member.is_governor ? "Да" : "Нет"}</TableCell>
              <TableCell>{member.order_number}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Link href={`/admin-panel/government/edit/${member.id}`}>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Редактировать</span>
                    </Button>
                  </Link>
                  <DeleteMemberButton id={member.id} />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

export default function GovernmentMembersPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Состав правительства</h1>
          <Link href="/admin-panel/government/create">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Добавить
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Члены правительства</CardTitle>
            <CardDescription>Управление составом правительства, отображаемым на сайте</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Загрузка...</div>}>
              <GovernmentMembersTable />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  )
}
