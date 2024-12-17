import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcrypt'

const seedClient = new PrismaClient()

const DEV_PASSWORD = 'devpassword123'

// Helper function to generate a unique ID (replacement for cuid2)
const generateId = () => {
  return 'id_' + Math.random().toString(36).substr(2, 9)
}

async function main() {
  try {
    // Create development users
    const devUsers = await Promise.all([
      // Super Admin
      seedClient.user.upsert({
        where: { email: 'superadmin@dev.local' },
        update: {},
        create: {
          email: 'superadmin@dev.local',
          name: 'Super Admin',
          role: UserRole.SUPER_ADMIN,
          password: await bcrypt.hash(DEV_PASSWORD, 10),
          subscription: {
            create: {
              status: 'active',
              stripeCustomerId: `cus_${generateId()}`,
              stripePriceId: 'price_enterprise',
              stripeSubscriptionId: `sub_${generateId()}`,
              currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            }
          }
        }
      }),
      // Admin
      seedClient.user.upsert({
        where: { email: 'admin@dev.local' },
        update: {},
        create: {
          email: 'admin@dev.local',
          name: 'Admin User',
          role: UserRole.ADMIN,
          password: await bcrypt.hash(DEV_PASSWORD, 10),
          subscription: {
            create: {
              status: 'active',
              stripeCustomerId: `cus_${generateId()}`,
              stripePriceId: 'price_business',
              stripeSubscriptionId: `sub_${generateId()}`,
              currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            }
          }
        }
      }),
      // Regular User
      seedClient.user.upsert({
        where: { email: 'user@dev.local' },
        update: {},
        create: {
          email: 'user@dev.local',
          name: 'Regular User',
          role: UserRole.USER,
          password: await bcrypt.hash(DEV_PASSWORD, 10),
          subscription: {
            create: {
              status: 'active',
              stripeCustomerId: `cus_${generateId()}`,
              stripePriceId: 'price_basic',
              stripeSubscriptionId: `sub_${generateId()}`,
              currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            }
          }
        }
      })
    ])

    // Create sample analytics data
    const activities = await Promise.all(
      devUsers.flatMap(user => 
        Array.from({ length: 50 }).map(() => {
          return seedClient.activity.create({
            data: {
              type: ['pageview', 'click', 'signup', 'purchase'][Math.floor(Math.random() * 4)],
              description: `Sample activity for ${user.name}`,
              userId: user.id,
              timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
            }
          })
        })
      )
    )

    // Create sample reports for each user
    const reports = await Promise.all(
      devUsers.map(user => 
        seedClient.report.create({
          data: {
            name: `${user.name}'s Dashboard`,
            description: 'Key metrics and analytics overview',
            userId: user.id,
            filters: {
              dateRange: '30d',
              eventTypes: ['pageview', 'click', 'signup', 'purchase'],
              userGroups: ['all'],
              view: 'detailed'
            },
            layout: {
              components: [
                {
                  id: generateId(),
                  type: 'metrics',
                  title: 'Overview Metrics',
                  size: 'large'
                },
                {
                  id: generateId(),
                  type: 'timeseries',
                  title: 'Activity Timeline',
                  size: 'large'
                },
                {
                  id: generateId(),
                  type: 'table',
                  title: 'Recent Activities',
                  size: 'medium'
                }
              ]
            },
            isPublic: user.role === UserRole.USER,
            shareToken: user.role === UserRole.USER ? generateId() : null
          }
        })
      )
    )

    console.log('Seed data created:', {
      users: devUsers.map(u => ({ email: u.email, role: u.role })),
      activitiesCount: activities.length,
      reportsCount: reports.length,
      devPassword: DEV_PASSWORD
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await seedClient.$disconnect()
  })