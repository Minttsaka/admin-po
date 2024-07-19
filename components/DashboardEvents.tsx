import { prisma } from '@/lib/connect'
import React from 'react'

export default async function DashboardEvents() {

   

    const [events, newEvent] = await prisma.$transaction([
        prisma.event.findMany({
            orderBy:{
                createdAt:"asc"
            },
            take:3
        }),
        prisma.event.findFirst({
            orderBy:{
                createdAt:"desc"
            },
            take:3
        }),
      ]);
    

  return (
    <div className='bg-white rounded-2xl p-6 m-6'>
        <h1 className=' font-extrabold text-4xl m-2'>
            Events
        </h1>
      <div className='grid grid-cols-2 bg-gray-100 p-6 rounded-2xl gap-2'>
        <div className='relative'>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70 rounded-2xl" />
            <img src={`${newEvent?.img}`} alt='event' className='w-full rounded-2xl' />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="bg-[green] text-white text-xs py-1 px-4 w-fit">New</h3>
                <h2 className="text-2xl md:text-3xl font-bold my-2">{newEvent?.title}</h2>
                <div className='flex justify-between gap-2 px-6 items-center'>
                        <div>
                            <h2 className='p-2 '>Location</h2>
                                <p className=''>{newEvent?.location}</p>
                            </div>

                            <div>
                            <h2 className='p-2 '>Time</h2>
                                <p className=''>{newEvent?.startTime}</p>
                            </div>

                        <div>
                            <h2 className='p-2 '>Days</h2>
                                <p className=''>{newEvent?.startDate.toDateString()} - {newEvent?.endDate.toDateString()}</p>
                            </div>

                    </div>
            </div>
        </div>
        
        <div className='grid grid-cols-1 gap-2 w-full'>
            {events.map(event=>(
                <div key={event.id} className='flex bg-[#0d2b0d] text-white p-4 rounded-2xl'>
                <div className='bg-white bg-opacity-20 flex items-center justify-center shadow-2xl px-10 rounded-2xl'>
                    <div className='text-center'>
                        <h2 className='p-2 border-b'>Date</h2>
                        <p className='text-6xl font-extrabold'>{event?.startDate.getDay()}</p>
                    </div>
                </div>
                <div className='w-full'>
                    <h3 className='text-5xl font-extrabold ml-5'>{event?.title}</h3>
                    <div className='flex justify-between gap-2 px-6 items-center'>
                        <div>
                            <h2 className='p-2 '>Location</h2>
                                <p className=''>{event?.location}</p>
                            </div>

                            <div>
                            <h2 className='p-2 '>Time</h2>
                                <p className=''>{event?.startTime}</p>
                            </div>

                        <div>
                            <h2 className='p-2 '>Days</h2>
                                <p className=''>{event?.startDate.toDateString()} - {event?.endDate.toDateString()}</p>
                            </div>

                    </div>
                </div>
                
                
            </div>
            ))}
                       
        </div>
      </div>
    </div>
  )
}
