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
import TransModalForm from './trans-modal-form';
import SubCatModalForm from './subcat-modal-form';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  regnskabId: number;
  categoryId: number | undefined;
};

export default function AddSubCatModalForm({
  open,
  setOpen,
  categoryId,
  regnskabId,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tilføj ny underkategori</DialogTitle>
          <DialogDescription>
            Her kan du tilføje en ny underkategori. Klik på 'Opret', når du er
            færdig.
          </DialogDescription>
        </DialogHeader>
        <SubCatModalForm
          categoryId={categoryId}
          regnskabId={regnskabId}
          closeModal={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
