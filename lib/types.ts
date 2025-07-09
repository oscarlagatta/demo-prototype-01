export interface PaymentService {
  id: string
  service: string
  priority: "Critical" | "High" | "Medium" | "Low"
  region: "US" | "APAC" | "EMEA" | "Global"
  lastUpdated: Date
  today: ServiceStatus
  "6Jul": ServiceStatus
  "5Jul": ServiceStatus
  "4Jul": ServiceStatus
  "3Jul": ServiceStatus
  "2Jul": ServiceStatus
  "1Jul": ServiceStatus
  lastMonth: ServiceStatus
}

export type ServiceStatus = "success" | "error" | "text"

export interface SummaryCard {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: any
  iconColor: string
}
