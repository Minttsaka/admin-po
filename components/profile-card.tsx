/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/jtgwJ7Su9f3
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
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export function ProfileCard() {
  return (
    <Card className="mx-auto max-w-md bg-gradient-to-br from-[#7f5a83] to-[#0d324d] text-white shadow-lg">
      <CardHeader className="relative h-32 overflow-hidden rounded-t-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7f5a83] to-[#0d324d] opacity-70" />
        <img
          src="/placeholder.svg"
          alt="User Avatar"
          width={128}
          height={128}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-white"
        />
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">Gamer Wizard</h3>
            <p className="text-sm text-muted-foreground">Level 42</p>
          </div>
          <div className="bg-gradient-to-br from-[#7f5a83] to-[#0d324d] px-4 py-2 rounded-full text-sm font-medium">
            Pro
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <h4 className="text-lg font-semibold">Games Played</h4>
            <p className="text-4xl font-bold">127</p>
          </div>
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <h4 className="text-lg font-semibold">Wins</h4>
            <p className="text-4xl font-bold">84</p>
          </div>
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <h4 className="text-lg font-semibold">Kills</h4>
            <p className="text-4xl font-bold">1,234</p>
          </div>
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <h4 className="text-lg font-semibold">Hours Played</h4>
            <p className="text-4xl font-bold">1,024</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
