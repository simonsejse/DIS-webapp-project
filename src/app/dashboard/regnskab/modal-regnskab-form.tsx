import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";

type FormOption = {
  label: string;
  defaultValue: string;
  id: string;
  type: string;
};

const FormOptions: FormOption[] = [
  { label: "Navn", defaultValue: "Regnskab 2024", id: "navn", type: "text" },
  {
    label: "Beskrivelse",
    defaultValue: "Oversigt over regnskab 2024",
    id: "beskrivelse",
    type: "text",
  },
  {
    label: "Start Dato",
    defaultValue: "2024-01-01",
    id: "startdato",
    type: "date",
  },
];

export default function AccountingForm({
  className,
  closeModal,
}: React.ComponentProps<"form"> & { closeModal: () => void }) {
  const [formData, setFormData] = React.useState({
    navn: "Regnskab 2024",
    beskrivelse: "Oversigt over regnskab 2024",
    startdato: "2024-01-01",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    closeModal();
    console.log("Form data submitted:", formData);
  };

  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={handleSubmit}
    >
      {FormOptions.map((option) => (
        <div key={option.id} className="grid gap-2">
          <Label
            className="uppercase text-xs tracking-wider"
            htmlFor={option.id}
          >
            {option.label}
          </Label>
          <Input
            type={option.type}
            id={option.id}
            value={formData[option.id as keyof typeof formData]}
            onChange={handleChange}
          />
        </div>
      ))}
      <Button type="submit">Opret</Button>
    </form>
  );
}
