import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTable } from "./data-table";
import { Payment, columns } from "./columns";
import { Button } from "@/components/ui/button";
import AddAccountingModal from "./add-regnskab-modal";

type Props = {};

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      status: "igangværende",
      navn: "Oversigt 2024",
      created_at: "2024-01-01",
      last_updated_at: "2024-01-01",
    },
    {
      id: "728ed52fd",
      status: "færdig",
      navn: "Oversigt 2023",
      created_at: "2024-01-01",
      last_updated_at: "2024-01-01",
    },
    {
      id: "728ed52fd",
      status: "lukket",
      navn: "Oversigt 2022",
      created_at: "2024-01-01",
      last_updated_at: "2024-01-01",
    },
    {
      id: "728ed52fd",
      status: "lukket",
      navn: "Oversigt 2022",
      created_at: "2024-01-01",
      last_updated_at: "2024-01-01",
    },
    {
      id: "728ed52fd",
      status: "lukket",
      navn: "Oversigt 2022",
      created_at: "2024-01-01",
      last_updated_at: "2024-01-01",
    },
    {
      id: "728ed52fd",
      status: "lukket",
      navn: "Oversigt 2022",
      created_at: "2024-01-01",
      last_updated_at: "2024-01-01",
    },
    {
      id: "728ed52fd",
      status: "lukket",
      navn: "Oversigt 2022",
      created_at: "2024-01-01",
      last_updated_at: "2024-01-01",
    },
    {
      id: "728ed52fd",
      status: "lukket",
      navn: "Oversigt 2022",
      created_at: "2024-01-01",
      last_updated_at: "2024-01-01",
    },
    {
      id: "728ed52fd",
      status: "lukket",
      navn: "Oversigt 2022",
      created_at: "2024-01-01",
      last_updated_at: "2024-01-01",
    },
    {
      id: "728ed52fd",
      status: "lukket",
      navn: "Oversigt 2022",
      created_at: "2024-01-01",
      last_updated_at: "2024-01-01",
    },
    {
      id: "728ed52fd",
      status: "lukket",
      navn: "Oversigt 2022",
      created_at: "2024-01-01",
      last_updated_at: "2024-01-01",
    },
    {
      id: "728ed52fd",
      status: "lukket",
      navn: "Oversigt 2022",
      created_at: "2024-01-01",
      last_updated_at: "2024-01-01",
    },
    {
      id: "728ed52fd",
      status: "lukket",
      navn: "Oversigt 2022",
      created_at: "2024-01-01",
      last_updated_at: "2024-01-01",
    },
    {
      id: "728ed52fd",
      status: "lukket",
      navn: "aOversigt 2022",
      created_at: "2024-01-01",
      last_updated_at: "2024-01-01",
    },
    {
      id: "728ed52fd",
      status: "igangværende",
      navn: "Æversigt 2022",
      created_at: "2024-01-01",
      last_updated_at: "2024-01-01",
    },
    // ...
  ];
}

export default async function Regnskab({}: Props) {
  const data = await getData();
  return (
    <div className="max-w-6xl mx-auto p-5 pt-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl text-gray-700 font-semibold">Regnskab</h1>
        <AddAccountingModal />
      </div>
      <section className="mt-2">
        <DataTable columns={columns} data={data} />
      </section>
    </div>
  );
}
