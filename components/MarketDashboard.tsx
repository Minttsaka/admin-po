import React from 'react'
import { Progress } from './ui/progress'


export default function MarketDashboard() {
  return (
    <div className='bg-white shadow p-10 mb-2 rounded-md'>
        <h2 className='border-b py-2 mb-5 font-bold text-green-700'>Market place overview</h2>
        <div className='flex justify-between'>
            <div className="flex justify-center">
            <Progress value={35} className='w-40 h-40 bg-gray-100 shadow rounded-full'  />
            </div>
            <div className="text-[purple] font-bold grid grid-cols-2 gap-3">
                <div className="bg-blue-500 p-5 rounded-lg bg-opacity-30 shadow-lg">
                <p>45</p>
                    <p>orders</p>
                </div>
                <div className="bg-blue-500 p-5 rounded-lg bg-opacity-30 shadow-lg">
                    <p>45</p>
                    <p>orders</p>
                </div>
                <div className="bg-blue-500 p-5 rounded-lg bg-opacity-30 shadow-lg">
                <p>45</p>
                    <p>orders</p>
                </div>
                <div className="bg-blue-500 p-5 rounded-lg bg-opacity-30 shadow-lg">
                <p>45</p>
                    <p>orders</p>
                </div>
            </div>

        </div>
      
    </div>
  )
}
