"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AccountingForm from "./modal-regnskab-form";

export default function AddAccountingModal() {
  const [open, setOpen] = React.useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Nyt Regnskab</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tilføj Nyt Regnskab</DialogTitle>
          <DialogDescription>
            Her kan du tilføje et nyt regnskab. Klik på 'Opret', når du er
            færdig.
          </DialogDescription>
        </DialogHeader>
        <AccountingForm closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
}
