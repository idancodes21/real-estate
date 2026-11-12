import PropertyReferrals from '@/components/dashboard/property-referrals'
import PropertyShowcase from '@/components/dashboard/property-showcase'
import RevenueChart from '@/components/dashboard/revenue-chart'
import StatCards from '@/components/stat-cards'
import { getLatestProperties } from '../data/properties' 

export default async function DashboardPage() {
   const properties = await getLatestProperties(8);
  return (
  <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <StatCards />

      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <RevenueChart />
        <PropertyReferrals />
      </div>

       <PropertyShowcase properties={properties} />
    </div>
  )
}