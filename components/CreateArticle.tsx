"use client"
import CreateBlogRightBar from '@/components/CrateBlogRightBar'
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter, useSearchParams } from "next/navigation";
import ReactQuill from "react-quill";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Cross, ImageIcon, Loader2, PlusCircle, Upload, VideoIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { uploadToS3 } from '@/lib/s3';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { saveGenderArticle, savePost } from '@/lib/actions';
import { MultiFiles } from '@/lib/s3MultiFiles';
import { Article } from '@prisma/client';
import { z } from 'zod';
import { CategoriesOptions } from '@/components/categories-options';
import { formats, modules } from '@/lib/quillModules';
import Image from 'next/image';

const dataSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  img: z.string().optional(),
  selectedCategories: z.object({
    isTrending:z.boolean(),
    isFeatured:z.boolean(),
    isEditorsPick:z.boolean()
  }),
  video: z.string().optional(),
  featuredImg: z.array(z.string()).optional(),
  featuredVideo: z.array(z.string()).optional(),
  slug: z.string().min(1, 'Category is required'),
  catSlug: z.string().min(1, 'Category Slug is required'),
});


interface SelectedCategories {
  isTrending: boolean;
  isFeatured: boolean;
  isEditorsPick: boolean;
  isAnnouncement: boolean;
  isGossip: boolean;
  isEditorial: boolean;
}



type DataSchema={
  fileKey: string;
  fileName: string;
}

// 'uploads/1719569651846women.jpg'

export default function CreateArticle() {
  //const { status } = useSession();
  
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [imageFileKey, setImageFileKey] = useState<DataSchema>();

  const [videoFileKey, setVideoFileKey] = useState<DataSchema>();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [featuredImgs, setFeaturedImgs] = useState<string[]>(['uploads/1719595146812pngwing.com.png']);
  const [featuredVideo, setFeaturedVideo] = useState<string[]>(['https://videos.pexels.com/video-files/6498520/6498520-uhd_1440_2560_25fps.mp4']);


  const [selectedCategories, setSelectedCategories] = useState<SelectedCategories>({
    isTrending: false,
    isFeatured: false,
    isEditorsPick: false,
    isAnnouncement:false,
    isGossip:false,
    isEditorial:false
  })


  const handleCategoryChange = (category: keyof SelectedCategories) => {
    setSelectedCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };
  
  const searchParams = useSearchParams()

  const slug = searchParams.get('cat')
  const genderType = searchParams.get('type')
  const genderPo = searchParams.get('po')

    const uploadSingleMedia = async (file:{format:string,file:File})=>{

    try {

      setUploading(true);
      const data = await uploadToS3(file.file);
      if(!data?.fileKey) return toast.error("error when uploading");
      toast.success("Successfully uploaded the file");

      if(file.format==="image"){
        setImageFileKey(data)
      } else {
        setVideoFileKey(data)
      }
      
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  }


  const uploadMultiMedia = async (file:{format:string,file:any})=>{

    console.log("file",file)
    try {
      setUploading(true);
      const data = await  MultiFiles(file.file);
      if(!data) return toast.error("error when uploading");
      toast.success("Successfully uploaded the file");
      
      if(file.format==="image"){

        setFeaturedImgs(prevState => [...prevState, data]);



      } else {
   
        setFeaturedVideo(prevState => [...prevState, data]);

      }

    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
    console.log("Multifile", featuredImgs )
  }

  const slugify = (str:string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");


  const CreateBlog = async () => {

    const data = {
      title,
      selectedCategories,
      content: value,
      img: imageFileKey?.fileKey,
      video:videoFileKey?.fileKey,
      featuredImgs,
      featuredVideo,
      slug: slugify(title),
      catSlug: slug, 
    }

    const result = dataSchema.safeParse(data);

    if (!result.success) {
      toast.error('You forgot to enter either title or your content or else you didnt select category of your article')
      // console.log(result.error);
      // const formattedErrors = Object.values(result.error.format()).flatMap(errorObj =>
      //   errorObj && '_errors' in errorObj ? errorObj._errors : []
      // );

      // formattedErrors.map((error)=>{
      //   toast.error(error)
      // })
    
      // setErrors(formattedErrors);
    } else {
      setErrors([]);   
    if(genderPo==="genderinnovation"){
        const genderArticle = await saveGenderArticle(data, genderType!)
      if((genderArticle as Article).id ){
        toast.success('Successfully saved this article')
      } else {
        toast.error('Something went wrong')
      }

    } else {
      const newArticle = await savePost(data)
      if( (newArticle as Article).id){
        toast.success('Successfully saved this article')
      } else {
        toast.error('Something went wrong')
      }
    }
  } 
  }

  return (
    <div className='bg-white m-6 p-6 rounded-3xl'>
      <CategoriesOptions />
      <div className='flex gap-1 bg-gray-100 p-6 rounded-3xl'>
        <div className='relative  w-full h-[80vh] bg-white rounded-3xl shadow'>       
          <div className='top-24 py-5'>
              {!open && (
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
                  <div className='grid grid-cols-3 bg-white p-1 gap-5'>
                    <label  htmlFor="image">
                    <ImageIcon className='text-blue-500 h-4 w-4 cursor-pointer  '  />
                    </label>
                    <label  htmlFor="video">
                      <VideoIcon className='text-blue-500 h-4 w-4 cursor-pointer ' />
                    </label>
                    <div className='relative'>

                      <Upload className='text-blue-500 h-4 w-4 cursor-pointer  ' onClick={()=>setIsToggle((prev)=>!prev)} />

                        <Input
                          type="file"
                          id="multi-img"
                          onChange={(e) => uploadMultiMedia({
                          format:"image",
                          file:e.target.files!

                        })}
                          style={{ display: "none" }}
                          multiple
                          accept="image/*"
                        />
                        <Input
                          type="file"
                          id="multi-video"
                          onChange={(e) => uploadMultiMedia({
                          format:"video",
                          file:e.target.files!

                        })}
                          style={{ display: "none" }}
                          multiple
                          accept="video/*"
                        />
                      {
                        isToggle && 
                        <div className=' bg-white shadow px-5 py-1 absolute left-7 bottom-1/2'>
                          <p className='text-xs mb-2 text-gray-700 border-b pb-2 text-nowrap'>Featured media</p>
                          <div className='flex items-center gap-5'>
                            <label htmlFor="multi-img">
                            <ImageIcon className='text-blue-500 h-4 w-4 cursor-pointer  rounded-full' />
                            </label>
                            <label htmlFor="multi-video">
                              <VideoIcon className='text-blue-500 h-4 w-4 cursor-pointer  rounded-full' />
                            </label>
                          </div>
                          
                        </div>
                      }
                    </div>
                  </div>
                  <Textarea
                    placeholder="Title"
                    className='shadow text-3xl w-full h-3 focus-visible:ring-0 border-none bg-gray-100 mx-2'
                    onChange={(e) => setTitle(e.target.value)}
                  ></Textarea>
                  <Button className='bg-blue-500' onClick={CreateBlog} disabled={uploading}>
                    {uploading ? <Loader2 className='h-4 w-4 animate-spin' /> : "Publish"}
                  </Button>
                </div>
              )}
          </div>

          <ReactQuill
            className="h-[60vh] bg-gray-100  mx-2 placeholder:text-2xl outline-none"
            theme="bubble"
            modules={modules}
            formats={formats}
            value={value}
            onChange={setValue}
            placeholder="Tell your story..."
          />
        </div>
        <div className='w-[20vw]'>
        <CreateBlogRightBar />
        <div className="p-2 m-2 shadow rounded-2xl bg-white">
          <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="isEditorial"
                    checked={selectedCategories.isEditorial}
                    onCheckedChange={() => handleCategoryChange("isEditorial")}
                    className="w-5 h-5 rounded-md border-2 border-muted-foreground bg-background focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  />
                  <Label htmlFor="isEditorial" className="font-bold text-xs bg-gray-100 p-2 rounded-2xl">
                    Editorial
                  </Label>
                </div>
                
              </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="isEditorsPick"
                    checked={selectedCategories.isEditorsPick}
                    onCheckedChange={() => handleCategoryChange("isEditorsPick")}
                    className="w-5 h-5 rounded-md border-2 border-muted-foreground bg-background focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  />
                  <Label htmlFor="isEditorsPick" className="font-bold text-xs bg-gray-100 p-2 rounded-2xl">
                    isEditorsPick
                  </Label>
                </div>
                
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="isAnnouncement"
                    checked={selectedCategories.isAnnouncement}
                    onCheckedChange={() => handleCategoryChange("isAnnouncement")}
                    className="w-5 h-5 rounded-md border-2 border-muted-foreground bg-background focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  />
                  <Label htmlFor="isAnnouncement" className="font-bold text-xs bg-gray-100 p-2 rounded-2xl">
                    Announcement
                  </Label>
                </div>
                
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="isGossip"
                    checked={selectedCategories.isGossip}
                    onCheckedChange={() => handleCategoryChange("isGossip")}
                    className="w-5 h-5 rounded-md border-2 border-muted-foreground bg-background focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  />
                  <Label htmlFor="isGossip" className="font-bold text-xs bg-gray-100 p-2 rounded-2xl">
                    Gossip
                  </Label>
                </div>
                
              </div>
          </div>
          <h3 className="font-semibold">Other Options</h3>
          <p className='text-xs text-gray-700'>By default , the system is able to categorize the articles based on the options below. But in case you want to mark it st first hand you can choose the options anywhere</p>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isTrending"
                  checked={selectedCategories.isTrending}
                  onCheckedChange={() => handleCategoryChange("isTrending")}
                  className="w-5 h-5 rounded-md border-2 border-muted-foreground bg-background focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
                <Label htmlFor="isTrending" className="font-bold text-xs bg-gray-100 p-2 rounded-2xl">
                  isTrending
                </Label>
              </div>
              
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isFeatured"
                  checked={selectedCategories.isFeatured}
                  onCheckedChange={() => handleCategoryChange("isFeatured")}
                  className="w-5 h-5 rounded-md border-2 border-muted-foreground bg-background focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
                <Label htmlFor="isFeatured" className="font-bold text-xs bg-gray-100 p-2 rounded-2xl">
                  isFeatured
                </Label>
              </div>
              
            </div>
          </div>
          </div>
          <div className='bg-white p-2 m-2'>
            <h2 className='flex items-center bg-[purple] text-white p-2 w-full font-extrabold text-xs gap-2'>
              Media
            </h2>
            {imageFileKey?.fileKey && (
              <div className='grid grid-cols-2 gap-1'>
                <Image alt='thumbnail' src={`https://dct4life-files.s3.af-south-1.amazonaws.com/${imageFileKey.fileKey}`} width={100} height={100} />
                <div className='grid grid-cols-2 gap-1'>
                  {featuredImgs?.map((img,index)=>(
                    <Image key={index} alt='thumbnail' src={`https://dct4life-files.s3.af-south-1.amazonaws.com/${img}`} width={50} height={50} />
                  ))}
                  
                </div>
              </div>
            )}
            
          </div>
        </div>
        
      </div>
    </div>
  )
}

function ChevronDownIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


function SparkleIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  )
}

