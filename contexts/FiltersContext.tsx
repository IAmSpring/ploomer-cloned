'use client'

import React, { createContext, useContext, useState } from 'react'

interface Filters {
  dateRange: string
  eventTypes: string[]
  userGroups: string[]
  view: 'detailed' | 'summary'
}

interface FiltersContextType {
  filters: Filters
  updateFilters: (newFilters: Partial<Filters>) => void
  resetFilters: () => void
}

const defaultFilters: Filters = {
  dateRange: '30d',
  eventTypes: [],
  userGroups: [],
  view: 'summary'
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined)

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const resetFilters = () => {
    setFilters(defaultFilters)
  }

  return (
    <FiltersContext.Provider value={{ filters, updateFilters, resetFilters }}>
      {children}
    </FiltersContext.Provider>
  )
}

export const useFilters = () => {
  const context = useContext(FiltersContext)
  if (context === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider')
  }
  return context
} 