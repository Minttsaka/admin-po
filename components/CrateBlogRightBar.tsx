"use client"

import { BookMarked, PilcrowRight, PlusCircle, Save, Settings, User, XCircle } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { Input } from './ui/input'
import axios from 'axios';
import useSWR from 'swr';
import { toast } from 'sonner';
import { Category } from '@prisma/client';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const fetcher = async (url:string) => {
  const res = await axios.get(url);
  return res.data;
};

export default function CreateBlogRightBar() {

  const [open, setOpen]= useState(false)
  const [category, setCategory]= useState('')

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const slug = searchParams.get('cat')
  const genderType = searchParams.get('type')

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const addCat = async () => {
    try {

      await axios.post("/api/categories", {
        category
      });
      mutate();
  
     toast.success("success")

    } catch (error) {
      console.log(error)
    }
  };
  

  const { data, mutate, isLoading } = useSWR(
    `/api/categories`,
    fetcher
  );


  const handleOpen = () =>{

    setOpen((prev)=>!prev)
  }
  return (
    <div className='bg-white text-xs text-black shadow rounded-2xl p-2'>
        <h2 className='flex gap-2 mb-1 border-b py-5'>
            <Settings className='h-4 w-4' />
            Post Setting
        </h2>
      <div className='flex flex-col gap-1'>
      <h2 className='flex items-center bg-[purple] text-white p-2 w-full font-extrabold text-xs gap-2'>
           Gender Worrior
        </h2>
        <Link href={`${pathname}/?po=genderinnovation&&type=male`
        }  className={cn('flex justify-between items-center gap-2 bg-gray-100 p-2 rounded-2xl',{
          'bg-gray-400':genderType==='male'
        })}>
            <span className='flex items-center gap-1'>
              <Image alt='cat image' src="https://dct4life-files.s3.af-south-1.amazonaws.com/uploads/mens.png" width={50} height={50} className='rounded-2xl ' />
              Male
            </span>
            {genderType==='male' &&
            <Link href={`${pathname}`}>
              <XCircle className='h-5 w-5' />
            </Link>
            }
          </Link>
          <Link href={`${pathname}/?po=genderinnovation&type=female`}  className={cn('flex justify-between items-center gap-2 bg-gray-100 p-2 rounded-2xl',{
              'bg-gray-400':genderType==='female'
            })}>
              <span className='flex items-center gap-1'>
                <Image alt='cat image' src="https://dct4life-files.s3.af-south-1.amazonaws.com/uploads/women.jpg" width={50} height={50} className='rounded-2xl ' />
                Female
                </span>
            {genderType==='female' &&
            <Link href={`${pathname}`}>
              <XCircle className='h-5 w-5' />
            </Link>
            }
          </Link>
      </div>
    </div>
  )
}
