import type { Metadata } from "next"
import { getTreasuryData } from "@/lib/treasury"
import { TreasuryTable } from "./components/treasury-table"
import { DollarSign, TrendingUp, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Управление казной",
  description: "Управление записями о состоянии казны",
}

export const dynamic = "auto"

export default async function TreasuryAdminPage() {
  const treasuryData = await getTreasuryData()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <DollarSign className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Управление казной</h1>
          <p className="text-muted-foreground">Здесь вы можете управлять записями о состоянии казны</p>
        </div>
      </div>

      {/* Summary Cards */}
      {treasuryData.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Текущий баланс</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {treasuryData[treasuryData.length - 1]?.amount.toLocaleString("ru-RU")}
              </div>
              <p className="text-xs text-muted-foreground">
                на {new Date(treasuryData[treasuryData.length - 1]?.date).toLocaleDateString("ru-RU")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Всего записей</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{treasuryData.length}</div>
              <p className="text-xs text-muted-foreground">записей в базе данных</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Изменение</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {treasuryData.length >= 2 ? (
                  <span
                    className={
                      treasuryData[treasuryData.length - 1]?.amount >= treasuryData[treasuryData.length - 2]?.amount
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {treasuryData.length >= 2
                      ? (
                          treasuryData[treasuryData.length - 1]?.amount - treasuryData[treasuryData.length - 2]?.amount
                        ).toLocaleString("ru-RU")
                      : "0"}{" "}
                    
                  </span>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">с предыдущей записи</p>
            </CardContent>
          </Card>
        </div>
      )}

      <TreasuryTable treasuryData={treasuryData} />
    </div>
  )
}
