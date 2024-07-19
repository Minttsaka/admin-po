import React from 'react'
import { Button } from './ui/button'

export default function ProjectStat() {
  return (
    <div className=' bg-white font-bold shadow p-5'>
      <div className='flex justify-center'>
        <div className='w-full flex gap-3'>
            <h2>
                Stat
            </h2>
            <span>
                june 2024
            </span>
        </div>
        <Button className='bg-blue-400 rounded-md p-2 mb-2'>
            Approved
        </Button>
      </div>
      <div className='grid grid-cols-4  shadow text-gray-500'>
        <div className='border-r p-5 '>
            <p>tasks</p>
            <p>26</p>
        </div>
        
        <div className='border-r p-5'>
            <p>tasks</p>
            <p>26</p>
        </div>

        <div className='border-r p-5'>
            <p>tasks</p>
            <p>26</p>
        </div>

        <div className='border-r p-5'>
            <p>tasks</p>
            <p>26</p>
        </div>
      </div>
      <div className='flex justify-center'>
        <h2 className='text-[red] mt-5'>This is stat</h2>
      </div>
    </div>
  )
}
