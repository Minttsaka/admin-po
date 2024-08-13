"use client"
import { prisma } from '@/lib/connect'
import { Article, Comment } from '@prisma/client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Loader2 } from 'lucide-react'

export default function AttentionPosts() {

    const [flaggedComments,setFlaggedComments] = useState<Comment[]>()

    const [article, setArticle]=useState<Article>()

    const [loading, setloading]=useState(false)

    const [loadings, setloadings]=useState(false)

    useEffect(()=>{

        const fetchFlaggedComments = async () =>{
            setloading(true)
            const response = await axios.get('/api/comments')
            setFlaggedComments(response.data)
            setloading(false)
        }

        fetchFlaggedComments()

    },[])


    const fetchArticle = async (id:string)=>{
        setloadings(true)
        const response = await axios.get(`/api/comments/${id}`)
        setArticle(response.data)
        setloadings(false)
    }
 
   
  return (<>
  {loading &&(<Loader2 className='animate-spin font-bold h-6 w-6' />)}
  {flaggedComments && (
    <div className='bg-white rounded-2xl p-6 m-6'>
    <h1 className=' font-extrabold text-4xl m-2'>
        These comments needs your attention
    </h1>
    <div className=' bg-gray-100 p-6 rounded-2xl gap-2'>
        <div className='grid grid-cols-1 gap-2 w-full'>
            {loading &&(<p>loading</p>)}
            {flaggedComments?.map(comment=>(
                <Popover key={comment.id}>
                    <PopoverTrigger onClick={()=>fetchArticle(comment.articleId)}>
                    <div   className='flex bg-[#0d2b0d] text-white p-4 rounded-2xl'>
                    <div className='bg-white bg-opacity-20 shadow-2xl px-10 rounded-2xl'>
                        <div className='text-center'>
                            
                        
                            <p className=''>{new Date(comment?.createdAt).toDateString()}</p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <p className=' font-extrabold ml-5'>{comment?.desc}</p>
                        <p className='text-xs text-gray-500'>By {comment.userEmail}</p>
                    </div>
                    </div>
                </PopoverTrigger>
                <PopoverContent className='bg-white'>
                    <div className='space-y-2'>
                    {loading &&(<p>loading</p>)}
                        <h2 className='font-bold'>{article?.title}</h2>
                        {article && <p className='text-gray-500 text-xs'>{new Date(article?.createdAt!).toDateString()}</p>}
                    </div>
                </PopoverContent>
            </Popover>
            
            ))}
                    
        </div>
    </div>
    </div>
  )}
  </>
    
  )
}
