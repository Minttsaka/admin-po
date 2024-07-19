import { prisma } from "@/lib/connect";
import { NextResponse } from "next/server";
import { z } from "zod";

const FormSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    code: z.string(),
  });

  export async function GET(req: Request) {
   
  
    try {
      const department = await prisma.department.findMany(
        {
          include:{
            roles:true
          }
        }
      );
      return new NextResponse(JSON.stringify(department));
    } catch (err) {
      // console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" })
      );
    }
  };

  // CREATE A COMMENT
  export async function POST(req: Request, res: Response) {
    // const session = await getAuthSession();
  
    // if (!session) {
    //   return new NextResponse(
    //     JSON.stringify({ message: "Not Authenticated!" })
    //   );
    // }
  
    try {
      const body = await req.json();
      const {name, description ,code} = FormSchema.parse(body);
      const department = await prisma.department.create({
        data: { 
          name, 
          description ,
          code
         },
      });

      console.log("success",department)
  
      return new NextResponse(JSON.stringify(department));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" })
      );
    }
  };