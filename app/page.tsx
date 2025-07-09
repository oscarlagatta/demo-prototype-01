"use client"

import { useState } from "react"
import {
  ArrowUp,
  ArrowDown,
  CheckCircle,
  XCircle,
  Search,
  CalendarIcon,
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
  ChevronsLeft,
  ChevronsRight,
  PanelLeftClose,
  PanelLeftOpen,
  AlertCircle,
  Clock,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

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

const summaryCards = [
  {
    title: "Recent Issues",
    value: "204",
    change: "+12.5%",
    trend: "up",
    icon: AlertCircle,
    iconColor: "text-orange-500",
  },
  {
    title: "Pending Issues",
    value: "34",
    change: "-10.4%",
    trend: "down",
    icon: Clock,
    iconColor: "text-amber-500",
  },
  {
    title: "Running Services",
    value: "34",
    change: "+12.5%",
    trend: "up",
    icon: Activity,
    iconColor: "text-green-500",
  },
  {
    title: "Interruptions",
    value: "204",
    change: "+12.5%",
    trend: "up",
    icon: XCircle,
    iconColor: "text-red-500",
  },
]

const tableData = [
  {
    service: "US Wire",
    today: "success",
    "6Jul": "error",
    "5Jul": "success",
    "4Jul": "text",
    "3Jul": "text",
    "2Jul": "text",
    "1Jul": "text",
    lastMonth: "text",
  },
  {
    service: "APAC Payments",
    today: "success",
    "6Jul": "error",
    "5Jul": "success",
    "4Jul": "text",
    "3Jul": "text",
    "2Jul": "text",
    "1Jul": "text",
    lastMonth: "text",
  },
  {
    service: "EMEA Payments",
    today: "success",
    "6Jul": "error",
    "5Jul": "success",
    "4Jul": "text",
    "3Jul": "text",
    "2Jul": "text",
    "1Jul": "text",
    lastMonth: "text",
  },
  {
    service: "Test",
    today: "success",
    "6Jul": "error",
    "5Jul": "error",
    "4Jul": "error",
    "3Jul": "error",
    "2Jul": "error",
    "1Jul": "error",
    lastMonth: "error",
  },
  {
    service: "Test",
    today: "success",
    "6Jul": "success",
    "5Jul": "success",
    "4Jul": "success",
    "3Jul": "success",
    "2Jul": "success",
    "1Jul": "success",
    lastMonth: "success",
  },
  {
    service: "Test",
    today: "error",
    "6Jul": "success",
    "5Jul": "text",
    "4Jul": "text",
    "3Jul": "text",
    "2Jul": "text",
    "1Jul": "text",
    lastMonth: "text",
  },
  {
    service: "Test",
    today: "success",
    "6Jul": "success",
    "5Jul": "text",
    "4Jul": "text",
    "3Jul": "text",
    "2Jul": "text",
    "1Jul": "text",
    lastMonth: "text",
  },
  {
    service: "Test",
    today: "success",
    "6Jul": "success",
    "5Jul": "text",
    "4Jul": "text",
    "3Jul": "text",
    "2Jul": "text",
    "1Jul": "text",
    lastMonth: "text",
  },
  {
    service: "Test",
    today: "success",
    "6Jul": "success",
    "5Jul": "text",
    "4Jul": "text",
    "3Jul": "text",
    "2Jul": "text",
    "1Jul": "text",
    lastMonth: "text",
  },
]

function StatusIndicator({ status }: { status: string }) {
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
  const [date, setDate] = useState<Date>(new Date())

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
            months. Choose a status icon to see updates for that service.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Find a payment E2E Service" className="pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by payment region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Filter by payment region</SelectItem>
              <SelectItem value="us">US</SelectItem>
              <SelectItem value="apac">APAC</SelectItem>
              <SelectItem value="emea">EMEA</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full sm:w-[200px] justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "yyyy/MM/dd") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] text-center">Service</TableHead>
                <TableHead className="text-center">Today</TableHead>
                <TableHead className="text-center">6 Jul</TableHead>
                <TableHead className="text-center">5 Jul</TableHead>
                <TableHead className="text-center">4 Jul</TableHead>
                <TableHead className="text-center">3 Jul</TableHead>
                <TableHead className="text-center">2 Jul</TableHead>
                <TableHead className="text-center">1 Jul</TableHead>
                <TableHead className="text-center">Last Month</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-center">{row.service}</TableCell>
                  <TableCell className="text-center align-middle">
                    <StatusIndicator status={row.today} />
                  </TableCell>
                  <TableCell className="text-center align-middle">
                    <StatusIndicator status={row["6Jul"]} />
                  </TableCell>
                  <TableCell className="text-center align-middle">
                    <StatusIndicator status={row["5Jul"]} />
                  </TableCell>
                  <TableCell className="text-center align-middle">
                    <StatusIndicator status={row["4Jul"]} />
                  </TableCell>
                  <TableCell className="text-center align-middle">
                    <StatusIndicator status={row["3Jul"]} />
                  </TableCell>
                  <TableCell className="text-center align-middle">
                    <StatusIndicator status={row["2Jul"]} />
                  </TableCell>
                  <TableCell className="text-center align-middle">
                    <StatusIndicator status={row["1Jul"]} />
                  </TableCell>
                  <TableCell className="text-center align-middle">
                    <StatusIndicator status={row.lastMonth} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="flex-1 text-sm text-muted-foreground">0 of {tableData.length} row(s) selected.</div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select defaultValue="10">
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent side="top">
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">Page 1 of 4</div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex bg-transparent" disabled>
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="h-8 w-8 p-0 bg-transparent" disabled>
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="h-8 w-8 p-0 bg-transparent">
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex bg-transparent">
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
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
