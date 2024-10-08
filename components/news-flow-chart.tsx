/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/gJvEgbVGjuE
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
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { prisma } from "@/lib/connect"
import { MoreHorizontal, Plus } from "lucide-react"
import Link from "next/link"


export async function NewsFlowChart() {

  const quotes = await prisma.quotes.count()
  
  return (
    <div className='m-6 p-6 bg-white rounded-2xl'>
      <div className="grid grid-cols-2 gap-5">
      <div className="bg-gray-100 rounded-2xl p-6 md:p-10">
      <h2 className="text-2xl font-bold mb-6">Activity</h2>
      <div className="relative grid grid-cols-2 gap-6">
      <Card className="bg-[purple] text-secondary rounded-tl-[50px] rounded-br-[50px] p-6 flex flex-col items-center justify-center">
          <CardHeader className=" text-[#f0f0f0] p-4 rounded-t-md">
            <div className="flex items-center justify-between px-20 font-bold">
              <h2>Sponsors</h2>
              
            </div>
            
          </CardHeader>
          <CardContent className="flex justify-center p-4">
            <p className="font-bold text-white text-2xl">0</p>
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-between items-center">
              <Link href={'/observer/blog/media-news/create'}>
              <Plus className="h-6 w-6 rounded-full p-2 bg-white bg-opacity-20 shadow-lg text-white" />
              </Link>
              <Link href={'/observer/media-news/blog'} className="px-5 py-2 bg-white bg-opacity-20 shadow-lg rounded-lg text-white font-bold text-xs">View</Link>
            </div>
          </CardFooter>
        </Card>

        <Card className=" bg-black text-muted rounded-tr-[50px] rounded-bl-[50px] p-6 flex flex-col items-center justify-center">
          <CardHeader className=" text-[#f0f0f0] p-4 rounded-t-md">
            <div className="flex items-center justify-between px-20 font-bold">
              <h2>Quotes</h2>
              
            </div>
            
          </CardHeader>
          <CardContent className="flex justify-center p-4">
            <p className="font-bold text-white text-2xl">{quotes}</p>
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-between items-center">
              <Link href={'/observer/blog/media-news/qoutes'}>
              <Plus className="h-6 w-6 rounded-full p-2 bg-white bg-opacity-20 shadow-lg text-white" />
              </Link>
              <Link href={'/observer/media-news/quotes'} className="px-5 py-2 bg-white bg-opacity-20 shadow-lg rounded-lg text-white font-bold text-xs">View</Link>
            </div>
          </CardFooter>
        </Card>

        <Card className="  bg-[red] text-accent rounded-tr-[50px] rounded-bl-[50px] p-6 flex flex-col items-center justify-center">
          <CardHeader className=" text-[#f0f0f0] p-4 rounded-t-md">
            <div className="flex items-center justify-between px-20 font-bold">
              <h2>Advertisers</h2>
              
            </div>
            
          </CardHeader>
          <CardContent className="flex justify-center p-4">
            <p className="font-bold text-white text-2xl">0</p>
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-between items-center">
              <Link href={'/observer/blog/media-news/create'}>
              <Plus className="h-6 w-6 rounded-full p-2 bg-white bg-opacity-20 shadow-lg text-white" />
              </Link>
              <Link href={'/observer/media-news/blog'} className="px-5 py-2 bg-white bg-opacity-20 shadow-lg rounded-lg text-white font-bold text-xs">View</Link>
            </div>
          </CardFooter>
        </Card>

        <Card className="  bg-[green] text-secondary rounded-tl-[50px] rounded-br-[50px] p-6 flex flex-col items-center justify-center">
          <CardHeader className=" text-[#f0f0f0] p-4 rounded-t-md">
            <div className="flex items-center justify-between px-20 font-bold">
              <h2>Draft articles</h2>
              
            </div>
            
          </CardHeader>
          <CardContent className="flex justify-center p-4">
            <p className="font-bold text-white text-2xl">0</p>
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-between items-center">
              <Link href={'/observer/blog/media-news/create'}>
              <Plus className="h-6 w-6 rounded-full p-2 bg-white bg-opacity-20 shadow-lg text-white" />
              </Link>
              <Link href={'/observer/media-news/blog'} className="px-5 py-2 bg-white bg-opacity-20 shadow-lg rounded-lg text-white font-bold text-xs">View</Link>
            </div>
          </CardFooter>
        </Card>

      </div>
    </div>
      <img className="h-full w-full rounded-2xl shadow-2xl shadow-black" src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    </div>
    </div>
    
    
  )
}
