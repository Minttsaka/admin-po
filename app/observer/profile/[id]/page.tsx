import { UserDashboard } from '@/components/user-dashboard'
import React from 'react'

export default function page({params:{id}}:{params:{id:string}}) {
  return (
    <div>
      <UserDashboard id={id} />
    </div>
  )
}
