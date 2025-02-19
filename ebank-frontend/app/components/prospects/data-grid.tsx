'use client'

import { useRouter } from 'next/navigation'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/components/ui/table'

import { Prospect } from '@/app/types/rate.type'

interface DataGridProps {
  data: Prospect[]
}

export function DataGrid({ data }: DataGridProps) {
  const router = useRouter()

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Responsible</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className='text-center'>
                No prospects found.
              </TableCell>
            </TableRow>
          ) : (
            data.map(prospect => (
              <TableRow
                key={prospect.id}
                className='cursor-pointer'
                onClick={() => router.push(`/prospects/${prospect.id}`)}
              >
                <TableCell>{prospect.name}</TableCell>
                <TableCell>{prospect.address}</TableCell>
                <TableCell className='capitalize'>{prospect.stage}</TableCell>
                <TableCell className='capitalize'>
                  {prospect.origin.replace('_', ' ')}
                </TableCell>
                <TableCell>{prospect.responsible}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
} 