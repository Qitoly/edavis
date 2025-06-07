import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "О правительстве | E-Davis",
  description: "Информация о правительстве штата Davis",
}

export default function GovernmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-white">
      {children}
    </div>
  )
}
