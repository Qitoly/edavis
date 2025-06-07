import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTreasuryEntry } from "@/lib/treasury"
import { TreasuryForm } from "../../components/treasury-form"

export const metadata: Metadata = {
  title: "Редактировать запись о казне",
  description: "Редактирование записи о состоянии казны",
}

export default async function EditTreasuryPage({ params }: any) {
  const { id: idStr } = await params
  const id = Number.parseInt(idStr)

  if (isNaN(id)) {
    return notFound()
  }

  const treasuryEntry = await getTreasuryEntry(id)

  if (!treasuryEntry) {
    return notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Редактировать запись о казне</h1>
        <p className="text-muted-foreground">
          Редактирование записи о состоянии казны от {new Date(treasuryEntry.date).toLocaleDateString("ru-RU")}
        </p>
      </div>
      <TreasuryForm initialData={treasuryEntry} />
    </div>
  )
}
