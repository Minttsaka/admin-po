import { prisma } from "@/lib/connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
     

      const commentFlagged = await  prisma.comment.findMany({
        where:{
            flagged:true
        }
     })
     
  
      if (!commentFlagged) {
        throw new Error("Form not found");
      }
  
      return NextResponse.json(commentFlagged)
    } catch (error: any) {
      console.error("Error creating form:", error);
      console.log(error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  