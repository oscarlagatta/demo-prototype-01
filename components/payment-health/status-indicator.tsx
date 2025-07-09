import { CheckCircle, XCircle } from "lucide-react"
import type { ServiceStatus } from "@/lib/types"

interface StatusIndicatorProps {
  status: ServiceStatus
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
  if (status === "success") {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <CheckCircle className="w-5 h-5 text-green-600 fill-green-100" />
      </div>
    )
  }
  if (status === "error") {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <XCircle className="w-5 h-5 text-red-600 fill-red-100" />
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center w-full h-full">
      <span className="text-sm text-muted-foreground">Text</span>
    </div>
  )
}
