import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/prisma'
import type { Report } from '@/types/prisma'

export async function POST(request: Request) {
  const session = await getServerSession()
  
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const data = await request.json()
    const report = await prisma.report.create({
      data: {
        name: data.name,
        description: data.description,
        filters: data.filters,
        layout: data.layout,
        userId: session.user.id,
        isPublic: false
      }
    })

    return NextResponse.json(report)
  } catch (error) {
    console.error('Error creating report:', error)
    return NextResponse.json(
      { error: 'Failed to create report' },
      { status: 500 }
    )
  }
}

export async function GET() {
  const session = await getServerSession()
  
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const reports = await prisma.report.findMany({
      where: {
        OR: [
          { userId: session.user.id },
          { sharedWith: { some: { userId: session.user.id } } }
        ]
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    const convertedReports: Report[] = reports.map((report: Report) => ({
      id: report.id,
      name: report.name,
      description: report.description,
      filters: report.filters as Report['filters'],
      layout: report.layout as Report['layout'],
      shareToken: report.shareToken || null
    }))

    return NextResponse.json(convertedReports)
  } catch (error) {
    console.error('Error fetching reports:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession()
  
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const reportId = searchParams.get('id')

    if (!reportId) {
      return NextResponse.json(
        { error: 'Report ID is required' },
        { status: 400 }
      )
    }

    // Verify ownership
    const report = await prisma.report.findUnique({
      where: { id: reportId }
    })

    if (!report || report.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      )
    }

    await prisma.report.delete({
      where: { id: reportId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting report:', error)
    return NextResponse.json(
      { error: 'Failed to delete report' },
      { status: 500 }
    )
  }
} 