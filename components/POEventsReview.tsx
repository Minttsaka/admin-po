"use client"

import React from 'react'

export default function POEventsReview() {
  return (
    <div className=' m-6 p-6 bg-white rounded-2xl'>
      <div className="relative h-[60vh] bg-gray-100 rounded-2xl p-6 md:p-10">
        <video controls src='https://videos.pexels.com/video-files/2361938/2361938-uhd_2560_1440_30fps.mp4'controlsList="nodownload" className='absolute -top-20 inset-x-0 bottom-7 rounded-2xl shadow-2xl'></video>
        <div className='absolute inset-x-0 bottom-0 text-white p-6 bg-black bg-opacity-45'>
            <p>Insite for the masive event</p>
        </div>
      </div>
      
    </div>
  )
}
