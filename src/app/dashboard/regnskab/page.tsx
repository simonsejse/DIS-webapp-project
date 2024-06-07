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
import axios, { AxiosError, AxiosResponse } from "axios";
import LoadingComponent from "@/components/client/LoadingComponent";
import ErrorComponent from "@/components/client/ErrorComponent";
import { ErrorResponse } from "@/lib/responseBuilder";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import MyBreadcrumb from "@/components/client/Breadcrumb";

type Props = {};

type SuccessResponse = {
    message: string;
    data: Payment[];
};

async function fetchPayments() {
    const response = await axios.get<Payment[]>("/api/regnskab");
    return response;
}

export default function Regnskab({}: Props) {
    const { data, error, isLoading, isError } = useQuery<
        AxiosResponse<Payment[]>,
        AxiosError<ErrorResponse>
    >({
        queryKey: "accountings",
        queryFn: fetchPayments,
    });

    if (isLoading) {
        return <LoadingComponent />;
    }

    if (isError && error.response?.data.ismajor) {
        return (
            <ErrorComponent
                error={
                    error.response?.data.message ||
                    "Der skete en uventet serverfejl"
                }
            />
        );
    }

    return (
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <MyBreadcrumb crumbs={crumbs} />
            <div className="max-w-6xl mx-auto p-5 pt-10">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-2xl text-gray-700 font-semibold">
                        Regnskab
                    </h1>
                    <AddAccountingModal />
                </div>
                <section className="mt-2">
                    <DataTable columns={columns} data={data?.data || []} />
                </section>
            </div>
        </div>
    );
}

const crumbs = [
    {
        name: "Dashboard",
        href: "/dashboard",
    },
    {
        name: "Regnskab",
        href: "/dashboard/regnskab",
    },
];
