import { cn } from "@/lib/utils"
import type { PaymentService } from "@/lib/types"

interface PriorityBadgeProps {
  priority: PaymentService["priority"]
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "text-red-600 bg-red-50 border-red-200"
      case "High":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "Medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "Low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  return (
    <span className={cn("px-2 py-1 rounded-full text-xs font-medium border", getPriorityColor(priority))}>
      {priority}
    </span>
  )
}
