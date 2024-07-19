"use server"

import { Article, Category, User } from "@prisma/client";
import { prisma } from "./connect";
import { authOptions, } from "./auth";
import { getServerSession } from "next-auth";

export const savePost = async (data:any) => {


  const session:any = await getServerSession(authOptions);
  const userSession = session.user as User;

    try {

      const user = await prisma.user.findUnique({
        where: { id: userSession.id },
      });

      if (!user) {
        throw new Error(`User with email not found`);
      }


      const { catSlug,img,featuredImgs,featuredVideo,selectedCategories, ...filteredData} = data

      const {isTrending,
        isFeatured,
        isEditorsPick,
        isAnnouncement,
        isGossip,
        isEditorial
      } = selectedCategories

        const article = await prisma.article.create({
        data: { 
          ...filteredData,
          isTrending,
          isFeatured,
          isEditorsPick,
          isAnnouncement,
          isGossip,
          isEditorial,
          featuredImg: {
            create: featuredImgs.map((img:string) => ({
              url:process.env.AWS_URL + '/' + img
            }))
          },
          featuredVideo:{
            create: featuredVideo.map((video:string)=> ({
              url:process.env.AWS_URL + '/' + video
            }))
          },
          authorName:user.username,
          img:process.env.AWS_URL + '/' + img,
          author: {
            connect: { id: user.id },
          },
          cat: {
            connect: { slug:catSlug },
          },    
          
         },
         
        
      
        });
        console.log("success")

        if (!article) throw new Error("Something went wrong")


        return article
    
    } catch (err) {
        console.log(err);
        return "failed"
        
    }

}

export const saveGenderArticle = async (data:any, genderType:string) => {

  const session:any = await getServerSession(authOptions);
  const userSession = session.user as User;

    try {

      const user = await prisma.user.findUnique({
        where: { id: userSession.id },
      });

      const requiredGender = await prisma.gender.findFirst({
        where: { type: genderType },
      });

      if (!user) {
        throw new Error(`User with email not found`);
      }


      const { catSlug,img,featuredImgs,featuredVideo, selectedCategories, ...filteredData} = data

      const {isTrending,
        isFeatured,
        isEditorsPick,
        isAnnouncement,
        isGossip,
        isEditorial
      } = selectedCategories

        const article = await prisma.article.create({
        data: { 
          ...filteredData,
          isTrending,
          isFeatured,
          isEditorsPick,
          isAnnouncement,
          isGossip,
          isEditorial,
          featuredImg: {
            create: featuredImgs.map((img:string) => ({
              url: process.env.AWS_URL + '/' + img
            }))
          },
          featuredVideo:{
            create: featuredVideo.map((video:string)=> ({
              url:process.env.AWS_URL + '/' + video
            }))
          }, 
          authorName:user.username,
          img:process.env.AWS_URL + '/' + img,
          author: {
            connect: { id: user.id },
          },
          cat: {
            connect: { slug:catSlug },
          },
          gender: {
            connect: { id: requiredGender?.id }
          },
          
         }

        });
        console.log("success")

        if (!article) return false
        return article
    
    } catch (err) {
        console.log(err);
        return "failed"
        
    }

}

export const fetchBlog = async() =>{

    const blogs = await prisma.article.findMany();

    return blogs as Article[]
}

export const fetchCategories = async() =>{

    const categories = await prisma.category.findMany();

    return categories as Category[]
}

export const saveMember = async (data:any,selectedDepartment:string,role:string) => {

    const generateRandomPassword = (length = 12) => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
        let password = "";
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          password += charset[randomIndex];
        }
        return password;
      };

      const randomPassword = generateRandomPassword();
     

    try {
        const {bio ,startDate,salary,...fields}=data

        const newUser = await prisma.user.create({
            data:{
                ...fields,
                password:randomPassword,
                depName:selectedDepartment,
                role,
                createdAt:new Date(),
                bio: {
                  create: [
                    {
                      bio
                    }
                  ]
                },
                startDate: {
                  create: [
                    {
                      date: new Date(startDate)
                    }
                  ]
                },
                salary: {
                  create: [
                    {
                      salary: parseInt(salary)
                    }
                  ]
                }
            }
        });


  
        console.log("success")
        return "success"
    
    } catch (err) {
        console.log(err);
        return "failed"
        
    }

}