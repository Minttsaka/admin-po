/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/sNtFZCQc0vY
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { Roles } from "@prisma/client"
import { saveMember } from "@/lib/actions"

type Department = {
  id: string;
  name: string;
  description: string;
  code: string | null;
  roles: Roles[]
}

const FormSchema = z.object({
  username: z
    .string()
    .min(2, "First name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(4, "First name must be at least 2 characters"),
  bio: z.string().min(4, "First name must be at least 2 characters"),
  startDate: z.string(),
  salary: z.string().min(4, "First name must be at least 2 characters"),
});

type InputType = z.infer<typeof FormSchema>;

export function AddMember() {

  const [departments,setDepartments]=useState<Department[]>()
  const [selectedDepartment,setSelectedDepartment]=useState<string | null>()
  const [RequiredRoles,setRequiredRoles]=useState<Roles[]>()
  const [role,setRole]=useState<string | null>()

  useEffect(() => {
     if (selectedDepartment) {
      const department = departments?.find(dep => dep.name === selectedDepartment);
      if (department) {
        setRequiredRoles(department.roles);
      } else {
        setRequiredRoles([]);
      }
    } else {
      setRequiredRoles([]);
    }
    
  }, [selectedDepartment]);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors,isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  console.log("zod error", errors)


  const saveUser: SubmitHandler<InputType> = async (data) => {


    try {

      await saveMember(data,selectedDepartment!,role!)
      toast.success("seccessfully saved the user")
      router.push('observer/team')

    } catch (error) {
      console.log(error)
    }
  };

  useEffect(()=>{
    const getDep=async()=>{
      const response = await axios.get('/api/department')
      setDepartments(response.data)
    }
    getDep()
  },[])

  return (
    <Card className="bg-white text-gray-500 shadow m-10">
      <CardHeader className="text-center my-10 shadow-lg">
        <CardTitle>Add New Team Member</CardTitle>
        <CardDescription>Fill out the form to add a new member to your media and news company.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(saveUser)} className=" gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2" >
              <Label htmlFor="name">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-muted-foreground" />
                  <span>Name</span>
                </div>
              </Label>
              <Input className="w-full rounded-none bg-gray-100" {...register("username")} id="name" placeholder="Enter the member's name" />
              <p className="text-xs text-purple-500 text-muted-foreground">The full name of the team member.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                <div className="flex items-center gap-2">
                  <MailIcon className="h-5 w-5 text-muted-foreground" />
                  <span>Email</span>
                </div>
              </Label>
              <Input className="w-full rounded-none bg-gray-100" id="email" {...register("email")} type="email" placeholder="Enter the member's email" />
              <p className="text-xs text-purple-500 text-muted-foreground">The email address of the team member.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-5 w-5 text-muted-foreground" />
                  <span>Phone</span>
                </div>
              </Label>
              <Input className="w-full rounded-none bg-gray-100" id="phone" {...register("phone")} type="tel" placeholder="Enter the member's phone number" />
              <p className="text-xs text-purple-500 text-muted-foreground">The phone number of the team member.</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">
                <div className="flex items-center gap-2">
                  <BuildingIcon className="h-5 w-5 text-muted-foreground" />
                  <span>Department</span>
                </div>
              </Label>
              <Select onValueChange={(e)=>setSelectedDepartment(e)}>
                <SelectTrigger className="rounded-none bg-gray-100" >
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                {departments?.map((department)=>(
                        <SelectItem key={department.id} value={department.name}>{department.name}</SelectItem>
                      ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-purple-500 text-muted-foreground">The department or team the member belongs to.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">
                <div className="flex items-center gap-2">
                  <ClipboardIcon className="h-5 w-5 text-muted-foreground" />
                  <span>Role</span>
                </div>
              </Label>
              <Select onValueChange={(e)=>setRole(e)}>
                <SelectTrigger className="rounded-none bg-gray-100">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                {RequiredRoles?.map((role)=>(
                        <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                      ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-purple-500 text-muted-foreground">The specific role or position the member will have.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-date">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                  <span>Start Date</span>
                </div>
              </Label>
              <Input className="w-full rounded-none bg-gray-100" id="start-date" {...register("startDate")} type="date" placeholder="Enter the member's start date" />
              <p className="text-xs text-purple-500 text-muted-foreground">The date the team member will start working.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">
                <div className="flex items-center gap-2">
                  <DollarSignIcon className="h-5 w-5 text-muted-foreground" />
                  <span>Salary</span>
                </div>
              </Label>
              <Input className="w-full rounded-none bg-gray-100" id="salary" {...register("salary")} type="number" placeholder="Enter the member's salary" />
              <p className="text-xs text-purple-500 text-muted-foreground">The annual salary or compensation for the team member.</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">
              <div className="flex items-center gap-2">
                <InfoIcon className="h-5 w-5 text-muted-foreground" />
                <span>Bio</span>
              </div>
            </Label>
            <Textarea  id="bio"  {...register("bio")} placeholder="Enter a brief bio for the member" className="min-h-[100px] rounded-none bg-gray-100" />
            <p className="text-xs text-purple-500 text-muted-foreground">A short description or background about the team member.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            
          </div>
          <Button className="ml-auto bg-[purple] w-full text-white font-bold">Add Member</Button>
        </form>
      </CardContent>
    </Card>
  )
}

function BriefcaseIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}


function BuildingIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}


function CalendarIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function ClipboardIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  )
}


function DollarSignIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}


function InfoIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}


function MailIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function PhoneIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}


function UserIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}