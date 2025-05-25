import type { Metadata } from "next"
import Image from "next/image"
import { getGovernmentMembers } from "@/lib/government"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
        <h1 className="text-3xl font-bold mb-4">Состав правительства</h1>
        <p className="text-muted-foreground">Актуальная информация о составе правительства и руководящих должностях</p>
      </div>

      {governor && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Губернатор</h2>
          <Card className="max-w-md">
            <CardHeader className="text-center">
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
              <CardTitle className="text-xl">{governor.full_name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Badge variant="secondary" className="mb-2">
                {governor.position}
              </Badge>
              <p className="text-muted-foreground">{governor.department}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {otherMembers.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Члены правительства</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherMembers.map((member) => (
              <Card key={member.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{member.full_name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="mb-2">
                    {member.position}
                  </Badge>
                  <p className="text-muted-foreground text-sm">{member.department}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {members.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Информация о составе правительства пока не добавлена.</p>
        </div>
      )}
    </div>
  )
}
