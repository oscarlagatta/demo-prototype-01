"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import type { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Search, CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState } from "react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

const priorities = [
  {
    label: "Critical",
    value: "Critical",
  },
  {
    label: "High",
    value: "High",
  },
  {
    label: "Medium",
    value: "Medium",
  },
  {
    label: "Low",
    value: "Low",
  },
]

const regions = [
  {
    label: "US",
    value: "US",
  },
  {
    label: "APAC",
    value: "APAC",
  },
  {
    label: "EMEA",
    value: "EMEA",
  },
  {
    label: "Global",
    value: "Global",
  },
]

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const [date, setDate] = useState<Date>(new Date())
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Find a payment E2E Service"
          value={(table.getColumn("service")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("service")?.setFilterValue(event.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        {table.getColumn("priority") && (
          <DataTableFacetedFilter column={table.getColumn("priority")} title="Priority" options={priorities} />
        )}
        {table.getColumn("region") && (
          <DataTableFacetedFilter column={table.getColumn("region")} title="Region" options={regions} />
        )}
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
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
