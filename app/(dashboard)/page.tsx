import StatCards from '@/components/stat-cards'
import React from 'react'

const page = () => {
  return (
  <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <StatCards />
    </div>
  )
}

export default page