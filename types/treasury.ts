export interface Treasury {
  id: number
  amount: number
  date: string
  comment?: string | null
  created_at?: string
}

export interface TreasuryEntry {
  id: number
  amount: number
  date: string
}

export interface TreasuryInput {
  amount: number
  date: string
  comment?: string | null
}
