'use client'

import React from 'react'
import { Select, SelectItem } from '@tremor/react'
import { Calendar } from 'lucide-react'

interface DateRangeSelectorProps {
  value: string
  onChange: (value: string) => void
}

export default function DateRangeSelector({ value, onChange }: DateRangeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Calendar className="h-5 w-5 text-gray-500" />
      <Select
        value={value}
        onValueChange={onChange}
        className="w-40"
      >
        <SelectItem value="7d">Last 7 days</SelectItem>
        <SelectItem value="30d">Last 30 days</SelectItem>
        <SelectItem value="90d">Last 90 days</SelectItem>
      </Select>
    </div>
  )
} 