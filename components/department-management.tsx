/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/gAJIRhBbkal
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Departments from "./Departments"
import Roles from "./Roles"

export function DepartmentManagement() {
  const [activeTab, setActiveTab] = useState("departments")
  return (
    <div className="bg-white rounded-2xl p-6 m-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} >
        <TabsList className=" shadow-2xl">
          <TabsTrigger className=" w-full" value="departments">Departments</TabsTrigger>
          <TabsTrigger className=" w-full" value="roles">Roles</TabsTrigger>
        </TabsList>
        <TabsContent  value="departments">
          <Departments />
        </TabsContent>
        <TabsContent value="roles">
          <Roles />
        </TabsContent>
      </Tabs>
    </div>
  )
}
