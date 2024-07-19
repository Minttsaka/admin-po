import React from 'react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

export default function MediaNews() {
  return (
    <div className='m-6 p-6 rounded-2xl bg-white grid grid-cols-2 gap-6'>
        <div className='bg-gray-100 p-6 rounded-2xl'>
        <h2 className="text-2xl font-bold mb-6">Advertisers</h2>
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                No advertiser found
                </TableRow>
            </TableBody>
            </Table>
        </div>
        <div className='bg-gray-100 p-6 rounded-2xl'>
        <h2 className="text-2xl font-bold mb-6">Site Advertiser Analytics</h2>
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Current Period</TableHead>
                <TableHead>Previous Period</TableHead>
                <TableHead>Change</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                <TableCell>Revenue</TableCell>
                <TableCell>k0</TableCell>
                <TableCell>k0</TableCell>
                <TableCell className="text-green-500">0%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Expenses</TableCell>
                <TableCell>k0</TableCell>
                <TableCell>k0</TableCell>
                <TableCell className="text-red-500">0%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Profit/Loss</TableCell>
                <TableCell>k0</TableCell>
                <TableCell>k0</TableCell>
                <TableCell className="text-green-500">0%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Cash Flow</TableCell>
                <TableCell>k0</TableCell>
                <TableCell>k00</TableCell>
                <TableCell className="text-green-500">0%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Gross Margin</TableCell>
                <TableCell>0%</TableCell>
                <TableCell>0%</TableCell>
                <TableCell className="text-green-500">0%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Accounts Receivable</TableCell>
                <TableCell>k0</TableCell>
                <TableCell>k0</TableCell>
                <TableCell className="text-red-500">0%</TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </div>
      
    </div>
  )
}
