import type { Metadata } from "next"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllJobs } from "@/lib/jobs"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { ArrowRight, Briefcase, Building, Calendar, MapPin, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Вакансии - E-Davis",
  description: "Актуальные вакансии в государственных учреждениях E-Davis",
}

export default async function JobsPage() {
  const jobs = await getAllJobs()

  // Group jobs by department
  const jobsByDepartment: Record<string, typeof jobs> = {}

  jobs.forEach((job) => {
    if (!jobsByDepartment[job.department]) {
      jobsByDepartment[job.department] = []
    }

    jobsByDepartment[job.department].push(job)
  })

  const departments = Object.keys(jobsByDepartment)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white drop-shadow mb-2">Вакансии</h1>
          <p className="text-slate-300">Актуальные вакансии в государственных учреждениях E-Davis</p>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8 flex flex-wrap h-auto bg-slate-800/50 rounded-lg p-1">
          <TabsTrigger value="all">Все вакансии</TabsTrigger>
          {departments.map((department) => (
            <TabsTrigger key={department} value={department}>
              {department}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-gradient-to-br from-blue-700 to-purple-700 text-white p-6 rounded-xl shadow-xl"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold drop-shadow">{job.title}</h3>
                    <div className="flex items-center mt-2 text-slate-300">
                      <Building className="h-4 w-4 mr-1" /> {job.department}
                    </div>
                  </div>
                  <div className="text-lg font-medium">{job.salary} $</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-slate-300">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-1" /> {job.location}
                  </div>
                  <div className="flex items-center text-sm">
                    <Briefcase className="h-4 w-4 mr-1" /> {job.type}
                  </div>
                </div>
                <p className="text-slate-200 mb-4">{job.description}</p>
                <div>
                  <h4 className="font-medium mb-2">Требования:</h4>
                  <p className="text-slate-300">{job.requirements}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {departments.map((department) => (
          <TabsContent key={department} value={department}>
            <div className="grid grid-cols-1 gap-6">
              {jobsByDepartment[department].map((job) => (
                <div
                  key={job.id}
                  className="bg-gradient-to-br from-blue-700 to-purple-700 text-white p-6 rounded-xl shadow-xl"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold drop-shadow">{job.title}</h3>
                      <div className="flex items-center mt-2 text-slate-300">
                        <Building className="h-4 w-4 mr-1" /> {job.department}
                      </div>
                    </div>
                    <div className="text-lg font-medium">{job.salary} $</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-slate-300">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1" /> {job.location}
                    </div>
                    <div className="flex items-center text-sm">
                      <Briefcase className="h-4 w-4 mr-1" /> {job.type}
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-1" /> До {formatDate(job.deadline)}
                    </div>
                  </div>
                  <p className="text-slate-200 mb-4">{job.description}</p>
                  <div>
                    <h4 className="font-medium mb-2">Требования:</h4>
                    <p className="text-slate-300">{job.requirements}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
