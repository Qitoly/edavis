"use client"

import { TreasuryForm } from "../components/treasury-form"

export default function CreateTreasuryPageClient() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Создать запись о казне</h1>
        <p className="text-muted-foreground">Создайте новую запись о состоянии казны</p>
      </div>
      <TreasuryForm />
    </div>
  )
}
