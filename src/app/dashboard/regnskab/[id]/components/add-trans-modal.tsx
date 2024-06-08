'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function AddTransModal({ open, setOpen }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tilføj Ny Transaktion</DialogTitle>
          <DialogDescription>
            Her kan du tilføje en ny transaktion. Klik på 'Opret', når du er
            færdig.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
