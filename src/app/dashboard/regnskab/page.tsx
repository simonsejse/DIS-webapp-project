"use client";
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
import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";

type Props = {};

type SuccessResponse = {
    message: string;
    data: Payment[];
};

type ErrorResponse = {
    message: string;
};

async function fetchPayments(): Promise<Payment[]> {
    const response = await axios.get<SuccessResponse>("/api/regnskab");
    return response.data.data;
}

export default function Regnskab({}: Props) {
    const { data, error, isLoading } = useQuery<
        Payment[],
        AxiosError<ErrorResponse>
    >("regnskab", fetchPayments);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-5 pt-10">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl text-gray-700 font-semibold">
                    Regnskab
                </h1>
                <AddAccountingModal />
            </div>
            <section className="mt-2">
                <DataTable columns={columns} data={data || []} />
            </section>
        </div>
    );
}
