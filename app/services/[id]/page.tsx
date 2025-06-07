import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, FileText, Building, DollarSign, FileCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getServiceById } from "@/lib/services"
import { getPortalSettings } from "@/lib/settings"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const service = await getServiceById(params.id)

  if (!service) {
    return {
      title: "Услуга не найдена - E-Davis",
    }
  }

  return {
    title: `${service.title} - E-Davis`,
    description: service.description,
  }
}

export default async function ServicePage({ params }: { params: { id: string } }) {
  const service = await getServiceById(params.id)
  const settings = await getPortalSettings()

  if (!service) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/services" className="flex items-center text-slate-300 hover:text-white mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад к списку услуг
      </Link>

      <div className="space-y-6">
        <div className="bg-gradient-to-br from-indigo-700 to-purple-700 text-white p-6 rounded-xl shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <FileText className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold drop-shadow mb-2">{service.title}</h2>
                <p className="text-slate-200">{service.description}</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Требования</h3>
                <p className="text-slate-300">{service.requirements}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Процедура получения</h3>
                <p className="text-slate-300">{service.procedure}</p>
              </div>

              <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-slate-300 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Срок оказания</h4>
                        <p className="text-slate-300">{service.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <DollarSign className="h-5 w-5 text-slate-300 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Стоимость</h4>
                        <p className="text-slate-300">{service.cost} $</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Building className="h-5 w-5 text-slate-300 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Ответственный орган</h4>
                        <p className="text-slate-300">{service.department}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        <div className="bg-gradient-to-br from-indigo-700 to-purple-700 text-white p-6 rounded-xl shadow-xl">

              <div className="mb-4">
                <h3 className="text-xl font-bold drop-shadow">Получить услугу</h3>
                <p className="text-slate-300">Выберите удобный способ получения услуги</p>
              </div>

              <div className="border-t border-slate-600 my-6" />
              <div className="space-y-4">
                <Link
                  href={service.applyUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl mb-3 transition text-center"
                >
                  Подать заявление онлайн
                </Link>
                <Link
                  href={settings?.question_link ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition text-center"
                >
                  Задать вопрос
                </Link>

                {service.centers.length > 0 && (
                  <div className="pt-4">
                    <h4 className="font-medium mb-2">Центры оказания услуги</h4>
                    <ul className="space-y-2 text-sm">
                      {service.centers.map((center, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                        <FileCheck className="h-4 w-4 text-slate-300 mt-0.5" />
                          <span>{center}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

    </div>

  )
}
