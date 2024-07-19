import React from 'react'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'

export default function DashboardSubscribers() {
  return (
    <div className='bg-white rounded-2xl p-6 m-6'>
        <div className='flex gap-2 items-center'>
            <h1 className=' font-extrabold text-xl m-2'>
                Subscribers
            </h1>
            <Progress className='bg-gray-100 max-w-lg' value={20} />
            <p>Total</p>
            <Badge className='bg-[yellow]'>
                2
            </Badge>
        </div>
        
      <div className='grid grid-cols-1 gap-1 w-full bg-gray-100 text-white p-6'>
        <div className='bg-[#585824] flex gap-2 items-center p-3 rounded-2xl w-full'>
        <Badge className='bg-[green]'>
        Miracle tsaka
            </Badge>
            <p className='text-xs text-gray-200'>minttsaka@gmail.com</p>
        </div>
        <div className='bg-[#585824] flex gap-2 items-center p-3 rounded-2xl w-full'>
        <Badge className='bg-[green]'>
        Martha mabey
            </Badge>
            <p className='text-xs text-gray-200'>martha@dctfusion.com</p>
        </div>
      </div>
    </div>
  )
}
