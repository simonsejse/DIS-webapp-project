'use client';

import { Badge } from '@/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  ChevronRight,
  Delete,
  FileText,
  Loader,
  MoreHorizontal,
  Printer,
  Tag,
  Trash,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { headers } from 'next/headers';
import { StatusIcon } from './data-table-status-icons';
import { Translator } from '@/lib/utils';
import { PrettyDate } from '@/components/client/PrettyDate';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  status: 'OPEN' | 'CLOSED';
  description: string;
  name: string;
  created_at: string;
  last_updated_at: string;
};

type BadgeVariant = 'outline' | 'blue-subtle' | 'red-subtle' | 'green-subtle';
const badgeVariants: Record<string, BadgeVariant> = {
  OPEN: 'green-subtle',
  CLOSED: 'red-subtle',
};

//Column definitions for "Regnskab" in danish
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;
      const variant = badgeVariants[status] || 'outline';
      return <Badge variant={variant}>{Translator.translate(status)}</Badge>;
    },
  },
  {
    accessorKey: 'navn',
    header: 'Navn',
    cell: ({ row }) => (
      <div className="w-[200px] text-wrap">
        <span>{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: 'beskrivelse',
    header: 'Beskrivelse',
    cell: ({ row }) => (
      <div className="w-[250px] text-wrap">
        <span>{row.original.description}</span>
      </div>
    ),
  },
  {
    accessorKey: 'created_at',
    header: 'Oprettet',
    cell: ({ row }) => <PrettyDate dateStr={row.original.created_at} />,
  },
  {
    accessorKey: 'last_updated_at',
    header: 'Sidst opdateret',
    cell: ({ row }) => <PrettyDate dateStr={row.original.last_updated_at} />,
  },
  {
    id: 'open_invoice',
    header: '',
    cell: ({ row }) => {
      const payment = row.original;
      const disabled = row.original.status === 'CLOSED';
      return (
        <Button disabled={disabled} variant="outline" size="icon-sm">
          <FileText size={18} color="gray" />
        </Button>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Handlinger</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ChevronRight className="mr-2 h-4 w-4" />
              <span>Se Regnskab</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Printer className="mr-2 h-4 w-4" />
              <span>Udskriv Regnskab</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Tag className="mr-2 h-4 w-4" />
                  <span>Markér status som</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <StatusIcon
                        status="OPEN"
                        className="mr-2 h-4 w-4 text-gray-600"
                      />
                      <span className="text-sm">Åben</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <StatusIcon
                        status="CLOSED"
                        className="mr-2 h-4 w-4 text-gray-600"
                      />
                      <span className="text-sm ">Lukket</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Trash className="mr-2 h-4 w-4" />
              <span>Slet Regnskab</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
