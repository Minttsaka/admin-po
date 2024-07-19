"use client"
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


export default function Departments() {

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


  const saveDepartment: SubmitHandler<InputType> = async (data) => {

    const {
      name, 
      code , 
      description
    } = data

    console.log("hello",
    name, 
    code , 
    description)

    try {

      await axios.post("/api/department", {
        name, 
        code , 
        description
      });
      mutate();
  
     toast.success("success")

    } catch (error) {
      console.log(error)
    }
  };

  const { data, mutate, isLoading } = useSWR(
    `/api/department`,
    fetcher
  );

  return (
    <div className="bg-gray-100 rounded-2xl p-6 m-6">
      <div className="grid grid-cols-2 gap-6">
            <Card className="border-none">
              <CardHeader>
                <CardTitle>Add Department</CardTitle>
                <CardDescription>Fill out the form to add a new department.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <form onSubmit={handleSubmit(saveDepartment)} className="grid grid-cols-1 gap-4">
                  <div className="space-x-2">
                    <Label htmlFor="department-name">Department Name</Label>
                    <Input id="department-name"  {...register("name")} placeholder="Enter department name" />
                  </div>
                  <div className="space-x-2">
                    <Label htmlFor="department-code">Department Code</Label>
                    <Input id="department-code"  {...register("code")} placeholder="Enter department code" />
                  </div>
                  <div className="space-y-2">
                  <Label htmlFor="department-description">Department Description</Label>
                  <Textarea id="department-description"  {...register("description")} placeholder="Enter department description" rows={3} />
                </div>
                <Button className="w-full bg-[purple] text-white font-bold" type="submit">Save Department</Button>
                </form>
                
              </CardContent>
            </Card>
            <Card className="border-none">
              <CardHeader>
                <CardTitle>Departments</CardTitle>
                <CardDescription>View and manage your existing departments.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department Name</TableHead>
                      <TableHead>Department Code</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    
                      {data?.map((department:Department)=>(
                        <TableRow key={department.id}>
                          <TableCell>{department.name}</TableCell>
                          <TableCell>{department.code}</TableCell>
                          <TableCell>{department.description}</TableCell>
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
