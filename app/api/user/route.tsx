import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/connect";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const FormSchema = z
  .object({
    fileKey:z.string()
  });

  export async function GET(req: Request) {

    const session:any = await getServerSession(authOptions);
    const userFromSession = session.user as User;
  
    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" })
      );
    }
   
    try {
      const user = await prisma.user.findFirst({
        where:{
            id:userFromSession.id
        }
      });
      return new NextResponse(JSON.stringify(user));
    } catch (err) {
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" })
      );
    }
  };

  // CREATE A COMMENT
  export async function POST(req: Request, res: Response) {
    const session:any = await getServerSession(authOptions);
    const userFromSession = session.user as User;
  
    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" })
      );
    }
  
    try {
      const body = await req.json();
      const { fileKey} = FormSchema.parse(body);

      await prisma.user.update({
        where:{
          id:userFromSession.id
        },
        data:{
          image: process.env.AWS_URL + '/' + fileKey
        }
      })
  
      return new NextResponse(JSON.stringify("success"));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" })
      );
    }
  };