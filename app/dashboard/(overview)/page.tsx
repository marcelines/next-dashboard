import { Suspense } from 'react'

import CardWrapper from '@/app/ui/dashboard/cards'
import LatestInvoices from '@/app/ui/dashboard/latest-invoices'
import RevenueChart from '@/app/ui/dashboard/revenue-chart'
import { lusitana } from '@/app/ui/fonts'
import {
  CardsSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from '@/app/ui/skeletons'

import type { Metadata } from 'next'
import ContributionGraph from '@/app/ui/dashboard/activity-graph'

export const metadata: Metadata = {
  title: 'Overview',
}

export default function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-15 md:text-19`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <ContributionGraph
            data={[
              {
                count: 0,
                date: '2021-08-01',
              },
              {
                count: 10,
                date: '2021-08-02',
              },
              {
                count: 5,
                date: '2021-08-03',
              },
              {
                count: 0,
                date: '2021-08-04',
              },
              {
                count: 3,
                date: '2021-08-05',
              },
            ]}
          />
        </Suspense>
      </div>
    </main>
  )
}
