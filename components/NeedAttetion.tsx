import React from 'react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

export default function NeedsAttetion() {
  return (
    <div className='m-6 p-6 rounded-2xl bg-white grid grid-cols-2 gap-6'>
        <div className='bg-gray-100 p-6 rounded-2xl'>
        <h2 className="text-2xl font-bold mb-6">YOur Articles</h2>
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
                <TableCell>$2,389.00</TableCell>
                <TableCell>$2,145.00</TableCell>
                <TableCell className="text-green-500">+11.4%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Expenses</TableCell>
                <TableCell>$1,454.00</TableCell>
                <TableCell>$1,289.00</TableCell>
                <TableCell className="text-red-500">+12.8%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Profit/Loss</TableCell>
                <TableCell>$935.00</TableCell>
                <TableCell>$856.00</TableCell>
                <TableCell className="text-green-500">+9.2%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Cash Flow</TableCell>
                <TableCell>$1,789.00</TableCell>
                <TableCell>$1,567.00</TableCell>
                <TableCell className="text-green-500">+14.2%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Gross Margin</TableCell>
                <TableCell>39.2%</TableCell>
                <TableCell>37.8%</TableCell>
                <TableCell className="text-green-500">+1.4%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Accounts Receivable</TableCell>
                <TableCell>$4,567.00</TableCell>
                <TableCell>$4,123.00</TableCell>
                <TableCell className="text-red-500">+10.7%</TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </div>
        <div className='bg-gray-100 p-6 rounded-2xl'>
        <h2 className="text-2xl font-bold mb-6">Draft Articles</h2>
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
                <TableCell>$2,389.00</TableCell>
                <TableCell>$2,145.00</TableCell>
                <TableCell className="text-green-500">+11.4%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Expenses</TableCell>
                <TableCell>$1,454.00</TableCell>
                <TableCell>$1,289.00</TableCell>
                <TableCell className="text-red-500">+12.8%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Profit/Loss</TableCell>
                <TableCell>$935.00</TableCell>
                <TableCell>$856.00</TableCell>
                <TableCell className="text-green-500">+9.2%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Cash Flow</TableCell>
                <TableCell>$1,789.00</TableCell>
                <TableCell>$1,567.00</TableCell>
                <TableCell className="text-green-500">+14.2%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Gross Margin</TableCell>
                <TableCell>39.2%</TableCell>
                <TableCell>37.8%</TableCell>
                <TableCell className="text-green-500">+1.4%</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Accounts Receivable</TableCell>
                <TableCell>$4,567.00</TableCell>
                <TableCell>$4,123.00</TableCell>
                <TableCell className="text-red-500">+10.7%</TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </div>
      
    </div>
  )
}
