
"use client"
import React from 'react'
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { uploadToS3 } from '@/lib/s3'
import axios from 'axios'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import useSWR from 'swr'
import { toast } from 'sonner'
import { Bio, User } from '@prisma/client'

const fetcher = async (url:string) => {
    const res = await axios.get(url);
    return res.data;
  };

  

export default function EditUser() {

    const uploadProfile = async (file:File) =>{

        const data = await uploadToS3(file);
    
        const res = await axios.post('/api/user',{
          fileKey:data?.fileKey
        })

        if(res.data==="success"){
            toast.success("successfully updated")
        } else {
            toast.success("something went wrong") 
        }
        mutate();
      }

      const { data, mutate, isLoading } = useSWR(
        `/api/user`,
        fetcher
      );
      

  return (
    <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={(data as User)?.username} disabled/>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={(data as User)?.email} disabled/>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      defaultValue="error displaying bio"
                      disabled
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className='bg-[green] text-white'>Save Changes</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Upload Profile Picture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={`${(data as User)?.image}`} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <Label htmlFor="profile-picture" className='cursor-pointer underline'>Click to upload</Label>
                    <Input id="profile-picture"
                     type="file"
                     onChange={(e) => uploadProfile(
                      e.target.files?.[0]!
                    )}
                     style={{ display: "none" }}
                          accept="image/*"
                     />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" disabled/>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" disabled/>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" disabled/>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button>Change Password</Button>
              </CardFooter>
            </Card>
          </div>
  )
}
