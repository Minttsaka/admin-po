import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/connect";
import { getUnsplashImage } from "@/lib/unsplash";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";


  const FormSchema = z.object({
    title: z.string(),
    company:z.string(),
    link:z.string(),
    address:z.string(),
    content:z.string(),
    location:z.string(),
    startDate:z.string(),
    endDate:z.string(),
    jobType:z.string()
  });


  export async function GET(req: Request) {
   
  
    try {
      const vacancies = await prisma.vacancy.findMany();

      return new NextResponse(JSON.stringify(vacancies));
    } catch (err) {
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" })
      );
    }
  };

  export async function POST(req: Request, res: Response) {

    const session:any = await getServerSession(authOptions);
    const userSession = session.user as User;
   
    try {
      const body = await req.json();
      const data = FormSchema.parse(body);

      const {startDate,endDate,...formatedData} = data

    
      const newVacancy= await prisma.vacancy.create({
        data:{
          ...formatedData,
          startDate:new Date(startDate),
          endDate:new Date(endDate),
          user:{
            connect:{
              id:userSession.id
            }
          }
        }
      });

      console.log(newVacancy)
  
      return new NextResponse(JSON.stringify(newVacancy));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" })
      );
    }
  };