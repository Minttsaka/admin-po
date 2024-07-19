import { prisma } from "@/lib/connect";
import { NextResponse } from "next/server";
import { z } from "zod";

const FormSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    code: z.string(),
    selectedDepartment: z.string(),
  });

  export async function GET(req: Request) {
   
  
    try {
      const roles = await prisma.roles.findMany();
      console.log("det",roles)
      return new NextResponse(JSON.stringify(roles));
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
      const {name, description ,code, selectedDepartment} = FormSchema.parse(body);

      const department = await prisma.department.findUnique({
        where: { name: selectedDepartment },
      });

      if (!department) {
        return NextResponse.json({ error: 'Department not found' });
      }

      const newRole = await prisma.roles.create({
        data: {
          name,
          description,
          code,
          dep: {
            connect: { name: department.name },
          },
        },
      });
  
      return new NextResponse(JSON.stringify(newRole));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" })
      );
    }
  };