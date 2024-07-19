import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { User } from '@prisma/client'

export default async function UserFirstSec({ user , count}:{ user:User, count:number }) {

  return (
    <div className="relative text-white m-6 p-6 rounded-2xl bg-white overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-[green] to-[black] skew-y-12 -translate-y-1/2 -translate-x-1/2 scale-150" />
    <div className="absolute inset-0 bg-gradient-to-tl from-[black] to-[black] -skew-y-12 translate-y-1/4 translate-x-1/2 scale-150" />
    <div className="relative z-10  h-full">
    <div className="relative z-10  justify-center  flex flex-col  space-y-6">
        <div className='flex justify-center'>
        <Avatar className="w-24 h-24 ring-2 ring-primary">
          <AvatarImage src={`${user.image}`} className='object-center object-cover'/>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">{user?.username}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto line-clamp-1">I love dctfusion as they way its making huge impact in malawi</p>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-3 gap-6 text-center">
        <div>
          <p className="text-2xl font-bold">{count}</p>
          <p className="text-muted-foreground">Posts</p>
        </div>
        <div>
          <p className="text-2xl font-bold">0</p>
          <p className="text-muted-foreground">Followers</p>
        </div>
        <div>
          <p className="text-2xl font-bold">0</p>
          <p className="text-muted-foreground">Following</p>
        </div>
      </div>
  </div>
</div>


  )
}
