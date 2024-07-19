/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/s82cvsBWUYm
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Rubik } from 'next/font/google'

rubik({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/

"use client"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { toast } from "sonner"
import useSWR from "swr"
import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"


type Quotes = {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
}

const FormSchema = z.object({
  content: z.string(),
  author: z.string(),
});

type InputType = z.infer<typeof FormSchema>;

const fetcher = async (url:string) => {
  const res = await axios.get(url);
  return res.data;
};


export function Quotes() {

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

  const addQuote : SubmitHandler<InputType> = async (data) => {

    const {
      content,
      author
    } = data
    
    try {

      await axios.post("/api/quotes", {
        content,
        author
      });
      mutate();
  
     toast.success("success")

    } catch (error) {
      console.log(error)
    }
  };
  
  const { data, mutate, isLoading } = useSWR(
    `/api/quotes`,
    fetcher
  );

  return (
    <div className="flex m-6 p-6 gap-5 min-h-screen rounded-2xl bg-white">
      <div className="flex flex-col rounded-2xl items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8 w-full">
        <form onSubmit={handleSubmit(addQuote)} className="mx-auto w-full space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Quote of the Day</h1>
            <p className="mt-2 text-muted-foreground">Input the quote you want And it will be randomly displayed to your site.</p>
          </div>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="quote">Quote</Label>
              <Textarea
                id="quote"
                {...register("content")}
                rows={4}
                placeholder="Enter your quote here..."
                className="mt-1 block w-full rounded-md border-input bg-transparent text-foreground shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                {...register("author")}
                placeholder="Enter the author's name"
                className="mt-1 block w-full rounded-md border-input bg-transparent text-foreground shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-[purple] text-white hover:bg-primary/90">
              Save Quote
            </Button>
          </div>
        </form>
      </div>
      <div className="rounded-3xl bg-gray-100 p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Generated Quotes</h2>
        <div className="space-y-2">
          {data?.map((quote:Quotes)=>(
            <Card key={quote.id} className="p-4  bg-white rounded-2xl">
            <blockquote className="text-lg font-medium leading-relaxed text-foreground">
              &ldquo;{quote.content}&rdquo;
            </blockquote>
            <div className="mt-2 text-muted-foreground">{quote.author}</div>
          </Card>
          ))}
          
        </div>
      </div>
    </div>
  )
}
