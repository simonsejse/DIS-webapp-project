"use client";

import MyBreadcrumb from "@/components/client/Breadcrumb";
import Dashboard from "@/components/client/Dashboard";
import ErrorComponent from "@/components/client/ErrorComponent";
import LoadingComponent from "@/components/client/LoadingComponent";
import { PrettyDate, PrettyDateAsString } from "@/components/client/PrettyDate";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ErrorResponse } from "@/lib/responseBuilder";
import axios, { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";

type Props = {
    params: {
        id: string;
    };
};

type Spreadsheet = {
    id: number;
    name: string;
    description: string;
    created_at: string;
    last_updated_at: string;
};

export default function Page({ params }: Props) {
    const fetchSpreadsheet = async (id: string) => {
        const response = await axios.get<Spreadsheet>(`/api/regnskab/${id}`);
        console.log(response.data);
        return response;
    };

    const { isLoading, isError, data, error } = useQuery<
        AxiosResponse<Spreadsheet>,
        AxiosError<ErrorResponse>
    >({
        queryKey: ["spreadsheet", params.id],
        queryFn: () => fetchSpreadsheet(params.id),
    });
    if (isLoading) return <LoadingComponent />;
    if (isError && error.response?.data.ismajor)
        return (
            <ErrorComponent
                error={
                    error.response?.data.message ||
                    "Der skete en uventet serverfejl"
                }
            />
        );

    const crumbs = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Regnskab", href: "/dashboard/regnskab" },
        {
            name: data?.data.name || "Udefineret",
            href: `/dashboard/regnskab/${params.id}`,
        },
    ];

    if (!data?.data) return <ErrorComponent error="Data kunne ikke hentes" />;

    const { id, name, description, createdAt, lastUpdatedAt } =
        extractSpreadsheetData(data?.data);

    return (
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 sm:pr-14">
            <MyBreadcrumb crumbs={crumbs} />
            <Card>
                <CardHeader>
                    <CardTitle>{name}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <Separator className="mb-5" />
                <CardContent>
                    <p>Created at: {createdAt}</p>
                    <p>Last updated at: {lastUpdatedAt}</p>
                </CardContent>
                <CardFooter>Hej</CardFooter>
            </Card>
        </div>
    );
}

function extractSpreadsheetData(data: Spreadsheet) {
    const id = data.id;
    const name = data.name;
    const description = data.description;
    const createdAt = PrettyDateAsString({ date: data.created_at });
    const lastUpdatedAt = PrettyDateAsString({ date: data.last_updated_at });

    return { id, name, description, createdAt, lastUpdatedAt };
}
