import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/connect"; 

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ error: "id parameter is missing" }, { status: 400 });
    }

    console.log("params", id);

    const article = await prisma.article.findUnique({
      where: { 
        id
       },
       
     
    });

    console.log("article", article)

    if (!article) {
      throw new Error("Form not found");
    }

    return NextResponse.json(article)
  } catch (error: any) {
    console.error("Error creating form:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



