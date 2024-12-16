'use client'

import React from 'react'
import { Card, Select, SelectItem, Button } from '@tremor/react'
import { Filter, X } from 'lucide-react'
import { useFilters } from '@/contexts/FiltersContext'

const eventTypes = [
  'page_view',
  'button_click',
  'form_submit',
  'api_call',
  'error'
]

const userGroups = [
  'all',
  'free',
  'pro',
  'enterprise'
]

export default function AnalyticsFilters() {
  const { filters, updateFilters, resetFilters } = useFilters()

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-medium">Filters</h3>
          </div>
          <Button
            size="xs"
            variant="secondary"
            icon={X}
            onClick={resetFilters}
          >
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Types
            </label>
            <Select
              value={filters.eventTypes.join(',')}
              onValueChange={(value) => 
                updateFilters({ eventTypes: value ? value.split(',') : [] })
              }
              placeholder="Select event types"
              enableClear
              className="w-full"
            >
              {eventTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.replace('_', ' ').toUpperCase()}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Groups
            </label>
            <Select
              value={filters.userGroups.join(',')}
              onValueChange={(value) =>
                updateFilters({ userGroups: value ? value.split(',') : [] })
              }
              placeholder="Select user groups"
              enableClear
              className="w-full"
            >
              {userGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group.toUpperCase()}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              View Type
            </label>
            <Select
              value={filters.view}
              onValueChange={(value) =>
                updateFilters({ view: value as 'detailed' | 'summary' })
              }
              className="w-full"
            >
              <SelectItem value="summary">Summary</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  )
} 