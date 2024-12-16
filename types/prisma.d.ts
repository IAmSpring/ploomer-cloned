import { Prisma } from '@prisma/client'

// Export specific model types
export type Subscription = Prisma.SubscriptionGetPayload<{}>
export type User = Prisma.UserGetPayload<{}>
export type Report = Prisma.ReportGetPayload<{}>
export type Activity = Prisma.ActivityGetPayload<{}> 