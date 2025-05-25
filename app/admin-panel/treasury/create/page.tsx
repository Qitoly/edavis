import type { Metadata } from "next"
import CreateTreasuryPageClient from "./CreateTreasuryPageClient"

export const metadata: Metadata = {
  title: "Создать запись о казне",
  description: "Создание новой записи о состоянии казны",
}

export default function CreateTreasuryPage() {
  return <CreateTreasuryPageClient />
}
