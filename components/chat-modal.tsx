/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/wEABwO8bWLx
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/

"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Bell } from "lucide-react"

export function ChatModal() {
  
  const [isOpen, setIsOpen]=useState(false)

  return (
    <div className="fixed bottom-0 right-4 w-full max-w-sm">
      {!isOpen && 
      <div className="fixed bottom-20 cursor-pointer right-20 bg-purple-100 rounded-full shadow-lg p-3 w-fit">
        <Bell className="h-7 w-7" onClick={()=>setIsOpen(true)} />
      </div>
        }
      {isOpen && 
      <div className="bg-white  animate__animated animate__backInUp rounded-lg shadow overflow-hidden">
        <div className="flex items-center justify-between bg-card p-4 -b -muted">
          <h3 className="text-lg font-bold">From Team</h3>
          <Button  onClick={()=>setIsOpen(!true)} variant="ghost" size="icon" className="rounded-full">
            <XIcon className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <div className="p-4 mx-4 flex flex-col gap-4 bg-gray-100 rounded-2xl">
          <p className="text-xs">No New Notification</p>
        </div>
        <div className="-t -muted p-4">
          <div className="relative">
            <Textarea placeholder="Type your message..." className="pr-16 min-h-[48px] rounded-lg resize-none bg-black text-white" disabled/>
            <Button type="submit" size="icon" className="absolute w-8 h-8 top-3 right-3">
              <SendIcon className="w-4 h-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </div>
      }
    </div>
  )
}

function SendIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}


function XIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
