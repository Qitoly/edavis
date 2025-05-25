"use client"

import { useState, useEffect } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { TreasuryEntry } from "@/types/treasury"

interface TreasuryChartProps {
  data: TreasuryEntry[]
}

interface ChartData {
  date: string
  amount: number
  formattedAmount: string
}

export function TreasuryChart({ data }: TreasuryChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([])

  useEffect(() => {
    // Format data for the chart
    const formattedData = data.map((entry) => ({
      date: new Date(entry.date).toLocaleDateString("ru-RU"),
      amount: entry.amount,
      formattedAmount: entry.amount.toLocaleString("ru-RU"),
    }))
    setChartData(formattedData)
  }, [data])

  if (chartData.length === 0) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <p className="text-muted-foreground">Нет данных для отображения</p>
      </div>
    )
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} />
          <YAxis
            tickFormatter={(value) => `${value.toLocaleString("ru-RU")}`}
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <Tooltip
            formatter={(value: number) => [`${value.toLocaleString("ru-RU")} $`, "Сумма"]}
            labelFormatter={(value) => `Дата: ${value}`}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="hsl(var(--primary))"
            fillOpacity={1}
            fill="url(#colorAmount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
