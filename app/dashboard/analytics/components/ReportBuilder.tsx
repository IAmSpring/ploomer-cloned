'use client'

import React, { useState } from 'react'
import { Card, Title, Button, TextInput, Textarea, Select, SelectItem } from '@tremor/react'
import { Save, Plus, Layout } from 'lucide-react'
import { useFilters } from '@/contexts/FiltersContext'

interface ReportComponent {
  id: string
  type: 'time-series' | 'metrics' | 'top-users' | 'donut'
  title: string
  size: 'small' | 'medium' | 'large'
}

export default function ReportBuilder() {
  const { filters } = useFilters()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [components, setComponents] = useState<ReportComponent[]>([])

  const handleAddComponent = () => {
    const newComponent: ReportComponent = {
      id: crypto.randomUUID(),
      type: 'time-series',
      title: 'New Component',
      size: 'medium'
    }
    setComponents([...components, newComponent])
  }

  const handleSaveReport = async () => {
    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          filters,
          layout: {
            components
          }
        })
      })

      if (!response.ok) throw new Error('Failed to save report')

      // Show success notification
    } catch (error) {
      console.error('Error saving report:', error)
      // Show error notification
    }
  }

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Title>Custom Report Builder</Title>
          <Button
            onClick={handleSaveReport}
            icon={Save}
            disabled={!name || components.length === 0}
          >
            Save Report
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Name
            </label>
            <TextInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Custom Report"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Report description..."
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Components</h3>
            <Button
              size="xs"
              variant="secondary"
              icon={Plus}
              onClick={handleAddComponent}
            >
              Add Component
            </Button>
          </div>

          <div className="space-y-4">
            {components.map((component) => (
              <Card key={component.id} className="bg-gray-50">
                <div className="flex items-center gap-4">
                  <Layout className="h-5 w-5 text-gray-500" />
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <TextInput
                      value={component.title}
                      onChange={(e) => {
                        const updated = components.map(c =>
                          c.id === component.id
                            ? { ...c, title: e.target.value }
                            : c
                        )
                        setComponents(updated)
                      }}
                      placeholder="Component Title"
                    />
                    <Select
                      value={component.type}
                      onValueChange={(value) => {
                        const updated = components.map(c =>
                          c.id === component.id
                            ? { ...c, type: value as ReportComponent['type'] }
                            : c
                        )
                        setComponents(updated)
                      }}
                    >
                      <SelectItem value="time-series">Time Series</SelectItem>
                      <SelectItem value="metrics">Metrics Grid</SelectItem>
                      <SelectItem value="top-users">Top Users</SelectItem>
                      <SelectItem value="donut">Donut Chart</SelectItem>
                    </Select>
                    <Select
                      value={component.size}
                      onValueChange={(value) => {
                        const updated = components.map(c =>
                          c.id === component.id
                            ? { ...c, size: value as ReportComponent['size'] }
                            : c
                        )
                        setComponents(updated)
                      }}
                    >
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </Select>
                  </div>
                  <Button
                    size="xs"
                    variant="secondary"
                    color="red"
                    onClick={() => {
                      setComponents(components.filter(c => c.id !== component.id))
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
} 