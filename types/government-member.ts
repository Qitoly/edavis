export interface GovernmentMember {
  id: number
  full_name: string
  department: string
  position: string
  photo_url: string | null
  is_governor: boolean
  order_number: number
  created_at: string
  updated_at: string
}

export interface GovernmentMemberFormData {
  full_name: string
  department: string
  position: string
  photo_url: string | null
  is_governor: boolean
  order_number: number
}
