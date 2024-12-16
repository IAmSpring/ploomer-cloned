import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

const seedClient = new PrismaClient()

async function main() {
  // Create demo user
  const demoUser = await seedClient.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      subscription: {
        create: {
          status: 'active',
          stripeCustomerId: 'cus_demo',
          stripePriceId: 'price_demo',
          stripeSubscriptionId: 'sub_demo',
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        }
      }
    }
  })

  // Create sample analytics data
  const activities = await Promise.all(
    Array.from({ length: 100 }).map((_, i) => {
      return seedClient.activity.create({
        data: {
          type: ['pageview', 'click', 'signup', 'purchase'][Math.floor(Math.random() * 4)],
          description: `Sample activity ${i}`,
          userId: demoUser.id,
          timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        }
      })
    })
  )

  // Create sample reports
  const reports = await Promise.all([
    seedClient.report.create({
      data: {
        name: 'Monthly Overview',
        description: 'Key metrics for the last 30 days',
        userId: demoUser.id,
        filters: {
          dateRange: '30d',
          eventTypes: ['pageview', 'click'],
          userGroups: ['all'],
          view: 'detailed'
        },
        layout: {
          components: [
            {
              id: randomUUID(),
              type: 'metrics',
              title: 'Overview Metrics',
              size: 'large'
            },
            {
              id: randomUUID(),
              type: 'timeseries',
              title: 'Activity Timeline',
              size: 'large'
            }
          ]
        },
        isPublic: false,
        shareToken: null
      }
    })
  ])

  console.log('Seed data created:', {
    user: demoUser,
    activitiesCount: activities.length,
    reportsCount: reports.length
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await seedClient.$disconnect()
  }) 