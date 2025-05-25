import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getTreasuryData } from "@/lib/treasury"
import { TreasuryChart } from "@/components/treasury/treasury-chart"

export const metadata: Metadata = {
  title: "Состояние и динамика казны",
  description: "Информация о состоянии и динамике казны",
}

export const dynamic = "force-dynamic"

export default async function TreasuryPage() {
  const treasuryData = await getTreasuryData()

  // Находим последнюю запись для отображения текущего состояния
  const currentTreasury = treasuryData.length > 0 ? treasuryData[treasuryData.length - 1] : null

  // Находим изменение по сравнению с предыдущей записью
  const previousTreasury = treasuryData.length > 1 ? treasuryData[treasuryData.length - 2] : null

  const change = currentTreasury && previousTreasury ? currentTreasury.amount - previousTreasury.amount : 0

  const changePercentage =
    currentTreasury && previousTreasury && previousTreasury.amount !== 0
      ? ((currentTreasury.amount - previousTreasury.amount) / previousTreasury.amount) * 100
      : 0

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Состояние и динамика казны</h1>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Текущее состояние казны</CardTitle>
            <CardDescription>
              По состоянию на {currentTreasury ? new Date(currentTreasury.date).toLocaleDateString("ru-RU") : "N/A"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {currentTreasury ? `${currentTreasury.amount.toLocaleString("ru-RU")} $` : "Нет данных"}
            </div>
            {currentTreasury && previousTreasury && (
              <div className={`mt-2 ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
                {change >= 0 ? "↑" : "↓"} {Math.abs(change).toLocaleString("ru-RU")} $ (
                {changePercentage >= 0 ? "+" : ""}
                {changePercentage.toFixed(2)}%)
              </div>
            )}
            {currentTreasury?.comment && (
              <div className="mt-4 text-sm text-muted-foreground">{currentTreasury.comment}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Статистика</CardTitle>
            <CardDescription>Основные показатели</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Всего записей</dt>
                <dd className="text-2xl font-bold">{treasuryData.length}</dd>
              </div>
              {treasuryData.length > 0 && (
                <>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Первая запись</dt>
                    <dd className="text-2xl font-bold">{new Date(treasuryData[0].date).toLocaleDateString("ru-RU")}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Минимальная сумма</dt>
                    <dd className="text-2xl font-bold">
                      {Math.min(...treasuryData.map((entry) => entry.amount)).toLocaleString("ru-RU")} $
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Максимальная сумма</dt>
                    <dd className="text-2xl font-bold">
                      {Math.max(...treasuryData.map((entry) => entry.amount)).toLocaleString("ru-RU")} $
                    </dd>
                  </div>
                </>
              )}
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Динамика казны</CardTitle>
          <CardDescription>Изменение суммы в казне по дням</CardDescription>
        </CardHeader>
        <CardContent>
          <TreasuryChart data={treasuryData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>История изменений</CardTitle>
          <CardDescription>Все записи о состоянии казны</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Дата</th>
                  <th className="text-right py-3 px-4">Сумма</th>
                  <th className="text-left py-3 px-4">Комментарий</th>
                </tr>
              </thead>
              <tbody>
                {treasuryData.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-4">
                      Нет данных
                    </td>
                  </tr>
                ) : (
                  treasuryData
                    .slice()
                    .reverse()
                    .map((entry) => (
                      <tr key={entry.id} className="border-b">
                        <td className="py-3 px-4">{new Date(entry.date).toLocaleDateString("ru-RU")}</td>
                        <td className="text-right py-3 px-4">{entry.amount.toLocaleString("ru-RU")} $</td>
                        <td className="py-3 px-4">{entry.comment || "-"}</td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
