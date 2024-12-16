import { Card, Grid } from '@tremor/react'

export default function LoadingSkeleton() {
  return (
    <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </Card>
      ))}
    </Grid>
  )
} 