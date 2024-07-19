"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Article, Category } from '@prisma/client'
import { fetchBlog } from '@/lib/actions'
import axios from 'axios'
export function ArticleList() {

    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState({
      role: "all",
      status: "all",
    })
    const [articles, setArticles] = useState<Article[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [sort, setSort] = useState({ key: "name", order: "asc" })
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
  
    console.log("art",categories)
  
    useEffect(()=>{
      const getBlog = async () => {
      
        const blogs = await fetchBlog()
        setArticles(blogs)
      };
      getBlog()
    
      const getCategory = async () => {
      
        const res = await axios.get('/api/categories')
        setCategories(res.data)
      };
      getCategory()
    },[])
  
    const allArticles = useMemo(() => {
      return articles
        .filter((article) => {
          const searchValue = search.toLowerCase()
          return (
            article.authorId.toLowerCase().includes(searchValue) ||
            article.catSlug.toLowerCase().includes(searchValue) ||
            article.content.toLowerCase().includes(searchValue) ||
            article.title.toLowerCase().includes(searchValue)
          )
        })
        .filter((article) => {
          if (filter.role === "all") return true
          return article.catSlug.toLowerCase() === filter.role
        })
        .filter((article) => {
          if (filter.status === "all") return true
          return article.catSlug.toLowerCase() === filter.status
        })
        .sort((a:any, b:any) => {
          if (sort.order === "asc") { 
            return a[sort.key] > b[sort.key] ? 1 : -1
          } else {
            return a[sort.key] < b[sort.key] ? 1 : -1
          }
        })
        .slice((page - 1) * pageSize, page * pageSize)
    }, [search, filter, sort, page, pageSize])

  return (
    <div className='bg-white rounded-2xl p-6 m-6'>
        <h1 className=' font-extrabold text-4xl m-2'>
            Articles
        </h1>
        <header className="bg-background border-b px-6 py-4 flex items-center justify-between gap-2">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-10 w-full rounded-3xl bg-gray-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <div className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filter.role === "all"}
                onCheckedChange={() => setFilter((prev) => ({ ...prev, role: "all" }))}
              >
                All Categories
              </DropdownMenuCheckboxItem>
              {categories?.map(category=>(
                 <DropdownMenuCheckboxItem
                 key={category.id}
                 checked={filter.role === category.title}
                 onCheckedChange={() => setFilter((prev) => ({ ...prev, role: category.title }))}
               >
                 {category.title}
               </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <div className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={sort.key === "catSlug" && sort.order === "asc"}
                onCheckedChange={() => setSort({ key: "catSlug", order: "asc" })}
              >
                Category (A-Z)
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sort.key === "catSlug" && sort.order === "desc"}
                onCheckedChange={() => setSort({ key: "catSlug", order: "desc" })}
              >
                Category (Z-A)
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sort.key === "createdAt" && sort.order === "asc"}
                onCheckedChange={() => setSort({ key: "createdAt", order: "asc" })}
              >
                CreatedAt (A-Z)
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sort.key === "createdAt" && sort.order === "desc"}
                onCheckedChange={() => setSort({ key: "createdAt", order: "desc" })}
              >
                CreatedAt (Z-A)
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sort.key === "views" && sort.order === "asc"}
                onCheckedChange={() => setSort({ key: "views", order: "asc" })}
              >
                Views (A-Z)
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sort.key === "views" && sort.order === "desc"}
                onCheckedChange={() => setSort({ key: "views", order: "desc" })}
              >
                Views (Z-A)
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sort.key === "likes" && sort.order === "asc"}
                onCheckedChange={() => setSort({ key: "likes", order: "asc" })}
              >
                Likes (A-Z)
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sort.key === "likes" && sort.order === "desc"}
                onCheckedChange={() => setSort({ key: "likes", order: "desc" })}
              >
                Likes (Z-A)
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className=' bg-gray-100 p-6 rounded-2xl gap-2 max-h-[70vh] overflow-y-auto'>
        <div className='grid grid-cols-1 gap-2 w-full '>
              {articles.map(article=>(
                <div key={article.id} className='flex bg-[#0d2b0d] text-white p-4 rounded-2xl'>
                <div className='bg-white bg-opacity-20 flex items-center justify-center shadow-2xl p-3 rounded-2xl'>
                  <img src={`${article.img}`} className='h-20 rounded-xl' />
                </div>
                <div className='w-full'>
                    <h3 className='text-5xl font-extrabold ml-5 uppercase line-clamp-1'>{article.title}</h3>
                    <div className='flex justify-between gap-2 px-6 py-2 ml-2 mt-2 rounded-2xl bg-gray-100 text-black items-center'>
                        <div>
                            <h2 className='p-2 font-extrabold'>Category</h2>
                                <p className=''>{article.catSlug}</p>
                            </div>

                            <div>
                            <h2 className='p-2 font-extrabold'>Views</h2>
                                <p className=''>{article.views}</p>
                            </div>

                            <div>
                            <h2 className='p-2 font-extrabold'>Category</h2>
                                <p className=''>{article.catSlug}</p>
                            </div>

                            <div>
                            <h2 className='p-2 font-extrabold'>Likes</h2>
                                <p className=''>{article.likes}</p>
                            </div>

                            <div>
                            <h2 className='p-2 font-extrabold'>Category</h2>
                                <p className=''>{article.catSlug}</p>
                            </div>

                            <div>
                            <h2 className='p-2 font-extrabold'>Is Announcent</h2>
                                <p className=''>{article.isAnnouncement ? "Yes" : "No"}</p>
                            </div>

                            <div>
                            <h2 className='p-2 font-extrabold'>Is gossip</h2>
                              <p className=''>{article.isGossip ? "Yes" : "No"}</p>
                            </div>

                            <div>
                            <h2 className='p-2 font-extrabold'>Is Editorial</h2>
                            <p className=''>{article.isEditorial ? "Yes" : "No"}</p>
                            </div>

                            <div>
                            <h2 className='p-2 font-extrabold'>Is Editor Pick</h2>
                            <p className=''>{article.isEditorsPick ? "Yes" : "No"}</p>
                            </div>
                            

                    </div>
                </div>
                
                
            </div>
              ))}
            
        </div>
      </div>
    </div>
  )
}
