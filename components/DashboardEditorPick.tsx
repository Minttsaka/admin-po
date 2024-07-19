import React from 'react'
import { Badge } from './ui/badge'
import { prisma } from '@/lib/connect';

export default async function DashboardEditorPick() {

    const [editorPick, newEditorPick] = await prisma.$transaction([
        prisma.article.findMany({
            where:{
                isEditorsPick:true
            },

            orderBy:{
                createdAt:"asc"
            },
            take:3
        }),
        prisma.article.findFirst({
            where:{
                isEditorsPick:true
            },
            orderBy:{
                createdAt:"desc"
            },
            take:3
        }),
      ]);
    

  return (
    <div className='bg-white rounded-2xl p-6 m-6'>
        <h1 className=' font-extrabold text-4xl m-2'>
            Todays editors Pick
        </h1>
      <div className='grid grid-cols-2 bg-gray-100 p-6 rounded-2xl gap-2'>
      <div className='relative'>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70 rounded-2xl" />
            <img src={`${newEditorPick?.img}`} alt='event' className='w-full rounded-2xl' />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="bg-[green] text-white text-xs py-1 px-4 w-fit">New</h3>
                <h2 className="text-2xl md:text-3xl font-bold my-2">{newEditorPick?.title}</h2>
                <div className='flex justify-between gap-2 px-6 items-center'>
                        <div>
                            <h2 className='p-2 '>Category</h2>
                                <p className=''>{newEditorPick?.catSlug}</p>
                            </div>

                            <div>
                            

                        <div>
                            <h2 className='p-2 '>Created at</h2>
                                <p className=''>{newEditorPick?.createdAt.toDateString()}</p>
                            </div>

                    </div>
                </div>
            </div>
        </div>
        <div className=''>
            <div className='grid grid-cols-1 gap-2 w-full'>
                {editorPick.map(article=>(
                    <div key={article.id} className='flex border-b pb-2 gap-5 items-center w-full'>
                    <img src={`${article.img}`} alt={article.title} className=' rounded h-10 w-10' /> 
                    <div>
                        <h2 className='font-bold line-clamp-1'>{article.title}</h2>
                        <Badge className='bg-[purple] text-white'>{article.isTrending ? "Trending" : "Not trending"}</Badge>
                    </div>
                    <p className='text-gray-700 text-xs'>{article.createdAt.toDateString()}</p>
                </div>
                ))}
                
            </div>
                
        </div>
        
      </div>
    </div>
  )
}
