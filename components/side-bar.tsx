/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/BwqzDUwQUrN
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
import Link from "next/link"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Button } from "./ui/button"
import { signOut } from "next-auth/react"
import { BotIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export function SideBar() {
  return (
<div className=" z-20 text-white flex w-64 flex-col items-center justify-between bg-[#051d05] p-4 ">
      <div className="mb-6 flex items-center gap-2">
        <Link href={`/observer/`}>
            <Avatar>
            <AvatarImage src={`https://dct4life-files.s3.af-south-1.amazonaws.com/uploads/pologo.png`} className="object-center object-cover" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      </div>
      <nav className="flex flex-col space-y-2 shadow-2xl shadow-black rounded-xl p-4">
        <div>
          <h2 className="mb-2 text-sm font-medium text-gradient from-[red] to-black">Main</h2>
          <ul className="grid gap-1">
            <li>
              <Link
                href="/observer"
                className="flex hover:bg-blue-200 hover:shadow-md items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r from-accent to-accent-foreground hover:text-gradient from-primary to-secondary"
                prefetch={false}
              >
                <HomeIcon className="h-4 w-4 text-gradient from-primary to-secondary" />
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex hover:bg-blue-200 hover:shadow-md items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r from-accent to-accent-foreground hover:text-gradient from-accent to-accent-foreground"
                prefetch={false}
              >
                <LayoutGridIcon className="h-4 w-4 text-gradient from-accent to-accent-foreground" />
                Dashboard
              </Link>
            </li>
      
          </ul>
        </div>
        <div>
          <h2 className="mb-2 text-sm font-medium text-gradient from-muted-foreground to-muted-foreground/80">Organization</h2>
          <ul className="grid gap-1">
            <li>
              <Link
                href="/observer/department"
                className="flex hover:bg-blue-200 hover:shadow-md items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r from-accent to-accent-foreground hover:text-gradient from-accent to-accent-foreground"
                prefetch={false}
              >
                <UsersIcon className="h-4 w-4 text-gradient from-accent to-accent-foreground" />
                Department
              </Link>
            </li>
            <li>
              <Link
                href="/observer/team/department"
                className="flex hover:bg-blue-200 hover:shadow-md items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r from-accent to-accent-foreground hover:text-gradient from-secondary to-muted"
                prefetch={false}
              >
                <UserPlusIcon className="h-4 w-4 text-gradient from-secondary to-muted" />
                Roles
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex hover:bg-blue-200 hover:shadow-md items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r from-accent to-accent-foreground hover:text-gradient from-primary to-secondary"
                prefetch={false}
              >
                <UserIcon className="h-4 w-4 text-gradient from-primary to-secondary" />
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-2 text-sm font-medium text-gradient from-muted-foreground to-muted-foreground/80">
            Apps
          </h2>
          <ul className="grid gap-1">
            <li>
              <Link
                href="/observer/media-news"
                className="flex hover:bg-blue-200 hover:shadow-md items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r from-accent to-accent-foreground hover:text-gradient from-muted to-muted-foreground"
                prefetch={false}
              >
                <BriefcaseIcon className="h-4 w-4 text-gradient from-muted to-muted-foreground" />
                Po Media/news
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex hover:bg-blue-200 hover:shadow-md items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r from-accent to-accent-foreground hover:text-gradient from-secondary to-muted"
                prefetch={false}
              >
                <CirclePlusIcon className="h-4 w-4 text-gradient from-secondary to-muted" />
                MarketPlace
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex hover:bg-blue-200 hover:shadow-md items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r from-accent to-accent-foreground hover:text-gradient from-primary to-secondary"
                prefetch={false}
              >
                <FolderIcon className="h-4 w-4 text-gradient from-primary to-secondary" />
                Manage
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-2 text-sm font-medium text-gradient from-muted-foreground to-muted-foreground/80">Team</h2>
          <ul className="grid gap-1">
            <li>
              <Link
                href="/observer/team"
                className="flex hover:bg-blue-200 hover:shadow-md items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r from-accent to-accent-foreground hover:text-gradient from-accent to-accent-foreground"
                prefetch={false}
              >
                <UsersIcon className="h-4 w-4 text-gradient from-accent to-accent-foreground" />
                Members
              </Link>
            </li>
            <li>
              <Link
                href="/observer/team/add"
                className="flex hover:bg-blue-200 hover:shadow-md items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r from-accent to-accent-foreground hover:text-gradient from-secondary to-muted"
                prefetch={false}
              >
                <UserPlusIcon className="h-4 w-4 text-gradient from-secondary to-muted" />
                Invite Team
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex hover:bg-blue-200 hover:shadow-md items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r from-accent to-accent-foreground hover:text-gradient from-primary to-secondary"
                prefetch={false}
              >
                <UserIcon className="h-4 w-4 text-gradient from-primary to-secondary" />
                Manage Teams
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-2 text-sm font-medium text-gradient from-muted-foreground to-muted-foreground/80">
            AI
          </h2>
          <ul className="grid gap-1">
            <li>
              <Link
                href="/observer/ai-training"
                className="flex hover:bg-blue-200 hover:shadow-md items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r from-accent to-accent-foreground hover:text-gradient from-accent to-accent-foreground"
                prefetch={false}
              >
                <BotIcon className="h-4 w-4 text-gradient from-accent to-accent-foreground" />
                AI model training
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex hover:bg-blue-200 hover:shadow-md items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r from-accent to-accent-foreground hover:text-gradient from-secondary to-muted"
                prefetch={false}
              >
                <CogIcon className="h-4 w-4 text-gradient from-secondary to-muted" />
                Manage
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex hover:bg-blue-200 hover:shadow-md items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gradient-to-r from-accent to-accent-foreground hover:text-gradient from-primary to-secondary"
                prefetch={false}
              >
                <BellIcon className="h-4 w-4 text-gradient from-primary to-secondary" />
                Notifications
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Button className="w-full bg-[red]" onClick={()=>signOut()}></Button>
    </div>
  )
}

function BellIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}


function BriefcaseIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
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


function CirclePlusIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  )
}


function CogIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 2v2" />
      <path d="M12 22v-2" />
      <path d="m17 20.66-1-1.73" />
      <path d="M11 10.27 7 3.34" />
      <path d="m20.66 17-1.73-1" />
      <path d="m3.34 7 1.73 1" />
      <path d="M14 12h8" />
      <path d="M2 12h2" />
      <path d="m20.66 7-1.73 1" />
      <path d="m3.34 17 1.73-1" />
      <path d="m17 3.34-1 1.73" />
      <path d="m11 13.73-4 6.93" />
    </svg>
  )
}


function FolderIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  )
}


function HomeIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function LayoutGridIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}


function LockIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}


function Package2Icon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}


function UserIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}


function UserPlusIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  )
}


function UsersIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}


function XIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
function FileTextIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  )
}

function ImageIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}


function LineChartIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  )
}


function SettingsIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

