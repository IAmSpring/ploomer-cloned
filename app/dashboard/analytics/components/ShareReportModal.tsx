'use client'

import React, { useState } from 'react'
import {
  Card,
  Title,
  Text,
  TextInput,
  Button,
  Select,
  SelectItem,
} from '@tremor/react'
import { X, Copy, Link, Mail } from 'lucide-react'

interface ShareReportModalProps {
  reportId: string
  reportName: string
  onClose: () => void
}

export default function ShareReportModal({
  reportId,
  reportName,
  onClose,
}: ShareReportModalProps) {
  const [shareType, setShareType] = useState<'public' | 'private'>('private')
  const [email, setEmail] = useState('')
  const [shareUrl, setShareUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleShare = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/reports/${reportId}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: shareType,
          email: email || undefined,
        }),
      })

      if (!response.ok) throw new Error('Failed to share report')

      const { url } = await response.json()
      setShareUrl(url)
    } catch (error) {
      console.error('Error sharing report:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <Title>Share Report</Title>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <Text>Share "{reportName}"</Text>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sharing Type
            </label>
            <Select
              value={shareType}
              onValueChange={(value) => setShareType(value as 'public' | 'private')}
            >
              <SelectItem value="private">Private Link</SelectItem>
              <SelectItem value="public">Public Link</SelectItem>
            </Select>
          </div>

          {shareType === 'private' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Share with Email (optional)
              </label>
              <TextInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                icon={Mail}
              />
            </div>
          )}

          <Button
            onClick={handleShare}
            loading={loading}
            icon={Link}
            className="w-full"
          >
            Generate Share Link
          </Button>

          {shareUrl && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Share Link
              </label>
              <div className="flex gap-2">
                <TextInput
                  value={shareUrl}
                  readOnly
                  className="flex-1"
                />
                <Button
                  variant="secondary"
                  icon={Copy}
                  onClick={copyToClipboard}
                >
                  Copy
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
} 