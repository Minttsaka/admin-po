import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/connect";
import { getUnsplashImage } from "@/lib/unsplash";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const FormSchema = z
  .object({
    title: z.string(),
    location: z.string(),
    description: z.string(),
    startDate: z.string(),
    startTime:z.string(),
    endDate: z.string(),
    img: z.string().nullable(),
    video: z.string().nullable(),
  });


  export async function GET(req: Request) {
   
  
    try {
      const events = await prisma.event.findMany();

      console.log(events)

      return new NextResponse(JSON.stringify(events));
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

      const {img, title,endDate,startDate, ...filteredData} = data

    
      const newEvent= await prisma.event.create({
        data:{
          ...filteredData,
          endDate:new Date(endDate),
          startDate:new Date(startDate),
          title,
          img:img || await getUnsplashImage(title),
          user: {
            connect: { email: userSession.email },
          },
        }
      });
  
      return new NextResponse(JSON.stringify(newEvent));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" })
      );
    }
  };