
import React from 'react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { NewsFlowChart } from '@/components/news-flow-chart'
import MediaNews from '@/components/MediaNews'
import POEventsReview from '@/components/POEventsReview'

export default function page() {
  return (
    <div>
      <NewsFlowChart />
      <MediaNews />
      <POEventsReview />
      
    </div>
  )
}
