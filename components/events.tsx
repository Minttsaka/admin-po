/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/0ZAbwKSPV4X
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client"

import { useState } from "react"
import { Input } from "./ui/input"
import { addDays, format, parseISO } from "date-fns"
import { Calendar as CalendarIcon, ImageIcon, VideoIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { uploadToS3 } from "@/lib/s3"
import { toast } from "sonner"
import useSWR from "swr"
import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import dayjs from "dayjs"
import { Event } from "@prisma/client"
import { Badge } from "./ui/badge"

const FormSchema = z.object({
  title: z.string(),
  location: z.string(),
  description:z.string()
});

type InputType = z.infer<typeof FormSchema>;

const fetcher = async (url:string) => {
  const res = await axios.get(url);
  return res.data;
};

export function Events() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Summer Kickoff Party",
      date: "2023-06-15",
      time: "7:00 PM",
      location: "Rooftop Lounge",
      description: "Join us for a night of music, drinks, and mingling as we kick off the summer season!",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Charity Gala",
      date: "2023-07-20",
      time: "6:30 PM",
      location: "Grand Ballroom",
      description:
        "Dress to impress and help us raise funds for a great cause. Featuring live music, a silent auction, and delicious hors d'oeuvres.",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      title: "Tech Meetup",
      date: "2023-08-05",
      time: "6:00 PM",
      location: "Innovation Hub",
      description:
        "Network with fellow tech enthusiasts, learn about the latest industry trends, and explore new opportunities.",
      image: "/placeholder.svg",
    },
    {
      id: 4,
      title: "Past Event",
      date: "2023-05-01",
      time: "8:00 PM",
      location: "Downtown Venue",
      description: "This event has already occurred.",
      image: "/placeholder.svg",
    },
  ])

  const [date, setDate] = useState<DateRange | undefined>()

  const [imageFileKey, setImageFileKey] = useState<string | null>(null);
  const [videoFileKey, setVideoFileKey] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [startTime, setStatTime]=useState<dayjs.Dayjs | null>()


 
  const startDate = date?.from

const endDate = date?.to

const { data, mutate, isLoading } = useSWR<Event[]>(
  `/api/events`,
  fetcher
);
 
  const dateObject = dayjs(startTime);

  // Format to get the time in 12-hour format with AM/PM
  const formattedTime = dateObject.format('h:mm A'); // h:mm A for 12-hour format with AM/PM
 
  const uploadSingleMedia = async (file:{format:string,file:File})=>{

    try {

      setUploading(true);
      const data = await uploadToS3(file.file);
      if(!data?.fileKey) return toast.error("error when uploading");
      toast.success("Successfully uploaded the file");

      if(file.format==="image"){
        setImageFileKey(data.fileKey)
      } else {
        setVideoFileKey(data.fileKey)
      }
      
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  }

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

  const addEvent : SubmitHandler<InputType> = async (data) => {

    const {
      title,
      location,
      description
    } = data
    
    try {

      await axios.post("/api/events", {
        title,
        location,
        description,
        startDate,
        endDate,
        startTime:formattedTime,
        img:imageFileKey,
        video:videoFileKey
      });
      mutate();
  
     toast.success("success")

    } catch (error) {
      console.log(error)
    }
  };
  

  console.log("data", data)


  return (
    <div className="flex flex-col bg-white p-6 m-6 rounded-2xl">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-1 p-6">
        <div className="bg-white p-6">
          <h2 className="text-xl font-bold mb-4">Create New Event</h2>
          <form className="bg-gray-100 p-6 rounded-2xl" onSubmit={handleSubmit(addEvent)}>
            <div className="mb-4">
              <label htmlFor="title" className="block font-medium mb-1">
                Event Title
              </label>
              <Input
                type="text"
                {...register("title")}
                id="title"
                name="title"
                className="w-full  rounded-md bg-white"
                required
              />
            </div>
            <div className="mb-4 grid grid-cols-2 sgap-4">
              <div>
                <label htmlFor="date" className="block font-medium mb-1">
                  Date
                </label>
                <Popover>
                  <PopoverTrigger className="bg-white w-full" asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      //initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
              <label htmlFor="date" className="block font-medium mb-1">
                  Time
                </label>
                <Popover>
                  <PopoverTrigger className="bg-white w-full" asChild>
                   <Button>TIme</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <div id="time">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <StaticTimePicker onChange={(e)=>setStatTime(e)} orientation="landscape" />
                    </LocalizationProvider>
                  </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block font-medium mb-1">
                Location
              </label>
              <Input
                type="text"
                id="location"
                {...register("location")}
                className="w-full bg-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                {...register("description")}
                className="w-full border-gray-300 rounded-md bg-white focus:border-primary focus:ring-primary"
                rows={4}
                required
              />
            </div>
            <div className="mb-4">
            <div className="m-2 flex items-center justify-between ">
                  <Input
                    type="file"
                    id="image"
                    onChange={(e) => uploadSingleMedia({
                        format:"image",
                        file:e.target.files?.[0]!

                      })}
                    style={{ display: "none" }}
                    accept="image/*"
                  />
                  <Input
                    type="file"
                    id="video"
                    onChange={(e) => uploadSingleMedia({
                      format:"image",
                      file:e.target.files?.[0]!

                    })}
                    style={{ display: "none" }}
                    accept="video/*"
                  />
                  <div className='flex bg-white shadow p-1 gap-5'>
                    <label htmlFor="image">
                    <ImageIcon className='text-blue-500 h-6 w-6 cursor-pointer  rounded-full'  />
                    </label>
                    <label htmlFor="video">
                      <VideoIcon className='text-blue-500 h-6 w-6 cursor-pointer  rounded-full' />
                    </label>
                   
                  </div>
                </div>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[purple] text-white w-full py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Create Event
            </Button>
          </form>
        </div>
             <img className="h-full w-full rounded-2xl shadow-2xl shadow-black" src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              
      </div>
      <div className="grid grid-cols-2 gap-1 mx-6 text-xs">
        <div className=" p-6">
          <Badge className="bg-[green] mb-5 text-white">Upcoming Events</Badge>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
            {data?.filter((event:Event) => new Date(event.startDate) > new Date())
              .map((event:Event) => (
                <div key={event.id} className="bg-gray-100  p-4 flex flex-col">
                  <img src={`${event.img}`} alt={event.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                  <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground mb-2">
                    {dayjs(startTime).format('MMMM D, YYYY')} - {dayjs(startTime).format('MMMM D, YYYY')}
                  </p>
                  <p className="text-muted-foreground mb-4">{event.location}</p>
                  <p className="flex-1">{event.description}</p>
                </div>
              ))}
          </div>
        </div>
        <div className=" p-6">
          <Badge className="bg-[red] mb-5 text-white">Past Events</Badge>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data?.filter((event:Event) => new Date(event.startDate) < new Date())
            .map((event:Event) => (
                <div key={event.id} className="bg-gray-100  p-4 flex flex-col">
                  <img src={`${event.img}`} alt={event.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                  <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground mb-2">
                    {dayjs(startTime).format('MMMM D, YYYY')} - {dayjs(startTime).format('MMMM D, YYYY')}
                  </p>
                  <p className="text-muted-foreground mb-4">{event.location}</p>
                  <p className="flex-1">{event.description}</p>
                </div>
              ))}
          </div>
        </div>

        </div>
    </div>
  )
}

function CalendarDaysIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}


function ClockIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}