import PropertyReferrals from '@/components/dashboard/property-referrals'
import RevenueChart from '@/components/dashboard/revenue-chart'
import StatCards from '@/components/stat-cards'
import React from 'react'

const page = () => {
  return (
  <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <StatCards />

      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <RevenueChart />
        <PropertyReferrals />
      </div>
    </div>
  )
}

export default page