import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession()
  
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const { userIds } = await request.json()
    
    // Verify report ownership
    const report = await prisma.report.findUnique({
      where: { 
        id: params.id,
        userId: session.user.id
      }
    })

    if (!report) {
      return NextResponse.json(
        { error: 'Report not found or unauthorized' },
        { status: 404 }
      )
    }

    // Create share records
    await prisma.sharedReport.createMany({
      data: userIds.map((userId: string) => ({
        reportId: params.id,
        userId
      })),
      skipDuplicates: true
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sharing report:', error)
    return NextResponse.json(
      { error: 'Failed to share report' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession()
  
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const { userId } = await request.json()
    
    await prisma.sharedReport.delete({
      where: {
        reportId_userId: {
          reportId: params.id,
          userId
        }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error removing share:', error)
    return NextResponse.json(
      { error: 'Failed to remove share' },
      { status: 500 }
    )
  }
} 