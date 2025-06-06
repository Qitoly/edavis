export interface Service {
  id: string
  title: string
  description: string
  duration: string
  requirements: string
  procedure: string
  department: string
  cost: string
  applyUrl?: string
  views: number
  createdAt: Date
  updatedAt: Date
}
