import { ArrowRight, FileText } from "lucide-react"
import Link from "next/link"
import type { Service } from "@/types/service"

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-700 to-purple-700 text-white p-6 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 hover:ring-2 hover:ring-blue-300 flex flex-col">
      <div className="flex items-start gap-4 pb-4">
        <FileText className="w-12 h-12" />
        <div>
          <h3 className="text-xl font-bold drop-shadow mb-2">{service.title}</h3>
          <p className="text-sm text-slate-200 line-clamp-2">{service.description}</p>
        </div>
      </div>
      <div className="mt-auto pt-4">
        <Link href={`/services/${service.id}`} className="underline flex items-center gap-1 hover:text-blue-300">
          Подробнее <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
