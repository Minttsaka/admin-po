/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/Y0lml10t9u6
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { IBM_Plex_Sans } from 'next/font/google'
import { Chivo } from 'next/font/google'

ibm_plex_sans({
  subsets: ['latin'],
  display: 'swap',
})

chivo({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pagination } from "@/components/ui/pagination"
import { Article, Category} from "@prisma/client"
import { fetchBlog, fetchCategories } from "@/lib/actions"
import axios from "axios"
import Image from "next/image"

export function Articles() {
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
    <div className="flex flex-col w-full h-full">
      <header className="bg-background border-b px-6 py-4 flex items-center justify-between">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-10 w-full"
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
      <div className="flex-1 overflow-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
            <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>CreatedAt</TableHead>
              <TableHead>ModifiedAt</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allArticles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium"><Image src={`${article.img}`} alt="for image" className="rounde-2xl" height={50} width={50}/></TableCell>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell><Badge>{article.catSlug}</Badge></TableCell>
                <TableCell>
                  <Badge>{article.authorId}</Badge>
                </TableCell>
                <TableCell>
                  {article.updatedAt.toDateString()}
                </TableCell>
                <TableCell>
                  {article.createdAt.toDateString()}
                </TableCell>
                <TableCell>
                  {article.views}
                </TableCell>
                <TableCell>
                  {article.likes}
                </TableCell>
                <TableCell>
                  {article.commentsCount}
                </TableCell>
               
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <div className="h-4 w-4" />
                        <span className="sr-only">article actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <div className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div className="h-4 w-4 mr-2" />
                        Reset Password
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <footer className="bg-background border-t px-6 py-4 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, articles.length)} of {articles.length} articles
        </div>

      </footer>
    </div>
  )
}
