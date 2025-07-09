"use client"

import { useState } from "react"
import {
  ArrowUp,
  ArrowDown,
  Monitor,
  Briefcase,
  AlertTriangle,
  Settings,
  BarChart3,
  Circle,
  Heart,
  Globe,
  Zap,
  MapPin,
  Building,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { summaryCards, paymentServices } from "@/lib/data"
import { columns } from "@/components/payment-health/columns"
import { DataTable } from "@/components/payment-health/data-table"

const mainSidebarItems = [
  { id: "e2e-monitor", title: "E2E Payment Monitor", icon: Monitor },
  { id: "app-portfolio", title: "Application Portfolio", icon: Briefcase },
  { id: "capacity-tracker", title: "Capacity Exception Tracker", icon: AlertTriangle },
  { id: "resource-mgmt", title: "Resource Management", icon: Settings },
  { id: "scorecard", title: "Scorecard", icon: BarChart3 },
  { id: "greendot", title: "GreenDot", icon: Circle },
]

const e2eSubMenuItems = [
  { id: "payment-health", title: "Payment Health Services", icon: Heart },
  { id: "global-search", title: "Global Payment Search", icon: Globe },
  { id: "us-wires", title: "U.S Wires", icon: Zap },
  { id: "apac-payments", title: "APAC Payments", icon: MapPin },
  { id: "emea-payments", title: "EMEA Payments", icon: Building },
  { id: "singapore", title: "Singapore", icon: MapPin },
]

function MainSidebar({
  selectedMainItem,
  onMainItemSelect,
  isCollapsed,
  onToggleCollapse,
}: {
  selectedMainItem: string
  onMainItemSelect: (id: string) => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}) {
  return (
    <div
      className={cn("bg-slate-800 text-white transition-all duration-300 flex flex-col", isCollapsed ? "w-16" : "w-64")}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-500 rounded"></div>
              <span className="text-lg font-semibold">BPS Portal</span>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={onToggleCollapse} className="text-white hover:bg-slate-700 p-1">
            {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        {!isCollapsed && (
          <div className="text-xs text-slate-400 font-medium mb-4 uppercase tracking-wider">PLATFORM</div>
        )}
        <nav className="space-y-2">
          {mainSidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onMainItemSelect(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                selectedMainItem === item.id
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white",
                isCollapsed && "justify-center",
              )}
              title={isCollapsed ? item.title : undefined}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && <span>{item.title}</span>}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

function SecondarySidebar({
  selectedSubItem,
  onSubItemSelect,
  isVisible,
  isCollapsed,
  onToggleCollapse,
}: {
  selectedSubItem: string
  onSubItemSelect: (id: string) => void
  isVisible: boolean
  isCollapsed: boolean
  onToggleCollapse: () => void
}) {
  if (!isVisible) return null

  return (
    <div
      className={cn(
        "bg-slate-100 border-r border-slate-200 transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && <h2 className="text-lg font-semibold text-slate-800">E2E Payment Monitor</h2>}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="text-slate-600 hover:bg-slate-200 p-1"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {e2eSubMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSubItemSelect(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                selectedSubItem === item.id ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-200",
                isCollapsed && "justify-center",
              )}
              title={isCollapsed ? item.title : undefined}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && <span>{item.title}</span>}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

function PaymentHealthDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Payment Health Services</h1>
        <div className="text-sm text-muted-foreground">Home &gt; E2E Payment Monitor &gt; Payment Health Services</div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              <card.icon className={cn("h-4 w-4", card.iconColor)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="flex items-center text-xs">
                {card.trend === "up" ? (
                  <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
                ) : (
                  <ArrowDown className="w-3 h-3 text-red-600 mr-1" />
                )}
                <span className={card.trend === "up" ? "text-green-600" : "text-red-600"}>{card.change}</span>
                <span className="text-muted-foreground ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service History Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Service History</h2>
          <p className="text-sm text-muted-foreground">
            The following table is a running log of the E2E Payment Monitor tool service interruptions for the past 12
            months. Choose a status icon to see updates for that service. Use the filters and sorting options to find
            specific services.
          </p>
        </div>

        {/* Data Table */}
        <DataTable columns={columns} data={paymentServices} />
      </div>
    </div>
  )
}

export default function E2EPaymentMonitor() {
  const [selectedMainItem, setSelectedMainItem] = useState("e2e-monitor")
  const [selectedSubItem, setSelectedSubItem] = useState("payment-health")
  const [mainSidebarCollapsed, setMainSidebarCollapsed] = useState(false)
  const [secondarySidebarCollapsed, setSecondarySidebarCollapsed] = useState(false)

  const handleMainItemSelect = (id: string) => {
    setSelectedMainItem(id)
    if (id === "e2e-monitor") {
      setSelectedSubItem("payment-health")
    }
  }

  const renderContent = () => {
    if (selectedMainItem === "e2e-monitor" && selectedSubItem === "payment-health") {
      return <PaymentHealthDashboard />
    }

    // Placeholder for other views
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">
          {selectedMainItem === "e2e-monitor"
            ? e2eSubMenuItems.find((item) => item.id === selectedSubItem)?.title
            : mainSidebarItems.find((item) => item.id === selectedMainItem)?.title}
        </h1>
        <p className="text-muted-foreground">Content for this section is coming soon...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full">
      <MainSidebar
        selectedMainItem={selectedMainItem}
        onMainItemSelect={handleMainItemSelect}
        isCollapsed={mainSidebarCollapsed}
        onToggleCollapse={() => setMainSidebarCollapsed(!mainSidebarCollapsed)}
      />

      <SecondarySidebar
        selectedSubItem={selectedSubItem}
        onSubItemSelect={setSelectedSubItem}
        isVisible={selectedMainItem === "e2e-monitor"}
        isCollapsed={secondarySidebarCollapsed}
        onToggleCollapse={() => setSecondarySidebarCollapsed(!secondarySidebarCollapsed)}
      />

      <main className="flex-1 bg-background overflow-auto">{renderContent()}</main>
    </div>
  )
}
