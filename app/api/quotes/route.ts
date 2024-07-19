import { prisma } from "@/lib/connect";
import { NextResponse } from "next/server";
import { z } from "zod";

const FormSchema = z
  .object({
    content: z.string(),
    author:z.string()
  });

  export async function GET(req: Request) {
   
  
    try {
      const quotes = await prisma.quotes.findMany();

      return new NextResponse(JSON.stringify(quotes));
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
      const data = FormSchema.parse(body);
    
      const newQuote = await prisma.quotes.create({
        data
      });
  
      return new NextResponse(JSON.stringify(newQuote));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" })
      );
    }
  };