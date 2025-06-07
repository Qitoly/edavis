import type { Metadata } from "next"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllServices } from "@/lib/services"
import ServiceCard from "@/components/service-card"
import { Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Услуги - E-Davis",
  description: "Государственные услуги, предоставляемые порталом E-Davis",
}

export default async function ServicesPage() {
  const services = await getAllServices()

  // Group services by department
  const servicesByDepartment: Record<string, typeof services> = {}

  services.forEach((service) => {
    if (!servicesByDepartment[service.department]) {
      servicesByDepartment[service.department] = []
    }
    servicesByDepartment[service.department] = []

    servicesByDepartment[service.department].push(service)
  })

  const departments = Object.keys(servicesByDepartment)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white drop-shadow mb-2">Государственные услуги</h1>
          <p className="text-slate-300">
            Полный список государственных услуг, предоставляемых порталом E-Davis
          </p>
        </div>

      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8 flex flex-wrap h-auto bg-slate-800/50 rounded-lg p-1">
          <TabsTrigger value="all">Все услуги</TabsTrigger>
          {departments.map((department) => (
            <TabsTrigger key={department} value={department}>
              {department}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </TabsContent>

        {departments.map((department) => (
          <TabsContent key={department} value={department}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesByDepartment[department].map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
