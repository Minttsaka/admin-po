import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/connect";
import { getUnsplashImage } from "@/lib/unsplash";
import { NextResponse } from "next/server";
import { z } from "zod";

const FormSchema = z
  .object({
    title: z.string(),
    description: z.string(),
  });

  export async function GET(req: Request) {
   
  
    try {
      const newCategories = await prisma.category.findMany(
        {
          include:{
            article:true
          }
        }
      );
      return new NextResponse(JSON.stringify(newCategories));
    } catch (err) {
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" })
      );
    }
  };

  // CREATE A COMMENT
  export async function POST(req: Request, res: Response) {
   
    try {
      const body = await req.json();
      const {title ,description}= FormSchema.parse(body);

      const category_image = await getUnsplashImage(
        title
      )

    
      const newCategory = await prisma.category.create({
        data: { 
          title:title.replace(" ","-"),
          description,
          slug:title,
          img:category_image
         },
      });
  
      return new NextResponse(JSON.stringify(newCategory ));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" })
      );
    }
  };