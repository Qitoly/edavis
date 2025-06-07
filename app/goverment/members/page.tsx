import type { Metadata } from "next"
import Image from "next/image"
import { getGovernmentMembers } from "@/lib/government"

import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Состав правительства - E-Davis",
  description: "Состав правительства портала государственных услуг E-Davis",
}

export default async function GovernmentMembersPage() {
  const members = await getGovernmentMembers()
  const governor = members.find((member) => member.is_governor)
  const otherMembers = members.filter((member) => !member.is_governor)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white drop-shadow mb-4">Состав правительства</h1>
        <p className="text-slate-300">Актуальная информация о составе правительства и руководящих должностях</p>
      </div>

      {governor && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white drop-shadow mb-6">Губернатор</h2>
          <div className="max-w-md bg-gradient-to-br from-blue-700 to-purple-700 text-white p-6 rounded-xl shadow-xl">
            <div className="text-center">
              <div className="mx-auto mb-4">
                {governor.photo_url ? (
                  <Image
                    src={governor.photo_url || "/placeholder.svg"}
                    alt={governor.full_name}
                    width={200}
                    height={200}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Фото отсутствует</span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold drop-shadow mb-2">{governor.full_name}</h3>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="mb-2">
                {governor.position}
              </Badge>
              <p className="text-slate-300">{governor.department}</p>
            </div>
          </div>
        </div>
      )}

      {otherMembers.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-white drop-shadow mb-6">Члены правительства</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherMembers.map((member) => (
              <div
                key={member.id}
                className="bg-gradient-to-br from-blue-700 to-purple-700 text-white p-6 rounded-xl shadow-xl"
              >
                <h3 className="text-lg font-bold drop-shadow mb-2">{member.full_name}</h3>
                <Badge variant="outline" className="mb-2">
                  {member.position}
                </Badge>
                <p className="text-slate-300 text-sm">{member.department}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {members.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-300">Информация о составе правительства пока не добавлена.</p>
        </div>
      )}
    </div>
  )
}
