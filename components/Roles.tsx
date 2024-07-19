"use client"

import React, { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useSWR from "swr";
import axios from "axios"
import { toast } from "sonner"
import { Department } from "@prisma/client"

type Roles = {
  id: string;
  name: string;
  description: string;
  code: string | null;
  depName: string;
}

const FormSchema = z.object({
  name: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
  code: z.string(),
  description: z.string().min(4, "First name must be at least 2 characters"),
});

type InputType = z.infer<typeof FormSchema>;

const fetcher = async (url:string) => {
  const res = await axios.get(url);
  return res.data;
};

export default function Roles() {

  const [departments,setDepartments]=useState<Department[]>()
  const [selectedDepartment, setSelectedDepartment] = useState<String | null>(null);

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


  const saveRole: SubmitHandler<InputType> = async (data) => {

    const {
      name, 
      code , 
      description,
    } = data

    console.log("hello",
    name, 
    code , 
    description,
    selectedDepartment)

    try {

      await axios.post("/api/roles", {
        name, 
        code , 
        description,
        selectedDepartment
      });
      mutate();
  
     toast.success("success")

    } catch (error) {
      console.log(error)
    }
  };

  const { data, mutate, isLoading } = useSWR(
    `/api/roles`,
    fetcher
  );

  useEffect(()=>{
    const getDep=async()=>{
      const response = await axios.get('/api/department')
      setDepartments(response.data)
    }
    getDep()
  },[])

  return (
    <div className='bg-gray-100 rounded-2xl p-6 m-6'>
      <div className="grid grid-cols-2 gap-6">
            <Card className='border-none'>
              <CardHeader>
                <CardTitle>Add Role</CardTitle>
                <CardDescription>Fill out the form to add a new role.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 ">
                <form onSubmit={handleSubmit(saveRole)}> 
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-x-2">
                    <Label htmlFor="role-name">Role Name</Label>
                    <Input id="role-name" {...register("name")} placeholder="Enter role name" />
                  </div>
                  <div className="space-x-2">
                    <Label htmlFor="role-code">Role Code</Label>
                    <Input id="role-code" {...register("code")} placeholder="Enter role code" />
                  </div>
                </div>
                <div className="space-y-2 mt-2">
                  <Label htmlFor="role-description">Role Description</Label>
                  <Textarea id="role-description" {...register("description")} placeholder="Enter role description" rows={3} />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select onValueChange={(e:string)=>setSelectedDepartment(e)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent className='bg-white'>
                      {departments?.map((department)=>(
                        <SelectItem key={department.id} value={department.name}>{department.name}</SelectItem>
                      ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-[purple] text-white font-bold" type="submit">Save Role</Button>
                </div>
                </form>
              </CardContent>
            </Card>
            <Card className='border-none'>
              <CardHeader>
                <CardTitle>Roles</CardTitle>
                <CardDescription>View and manage your existing roles.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role Name</TableHead>
                      <TableHead>Role Code</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                  {data?.map((roles:Roles)=>(
                        <TableRow key={roles.id}>
                          <TableCell>{roles.name}</TableCell>
                          <TableCell>{roles.code}</TableCell>
                          <TableCell>{roles.description}</TableCell>
                          <TableCell>{roles.depName}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="destructive" size="sm">
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>  
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
    </div>
  )
}
