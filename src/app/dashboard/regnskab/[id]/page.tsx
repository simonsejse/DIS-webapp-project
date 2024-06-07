"use client";

import MyBreadcrumb from "@/components/client/Breadcrumb";
import Dashboard from "@/components/client/Dashboard";
import ErrorComponent from "@/components/client/ErrorComponent";
import LoadingComponent from "@/components/client/LoadingComponent";
import { PrettyDate, prettyDateAsString } from "@/components/client/PrettyDate";
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
import { SpreadsheetDTO } from "@/types/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";

type Props = {
    params: {
        id: string;
    };
};

export default function Page({ params }: Props) {
    const fetchSpreadsheet = async (id: string) => {
        const response = await axios.get<SpreadsheetDTO>(`/api/regnskab/${id}`);
        console.log(response.data);
        return response;
    };

    const { isLoading, isError, data, error } = useQuery<
        AxiosResponse<SpreadsheetDTO>,
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

    const spreadsheet = data.data;

    return (
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 sm:pr-14">
            <MyBreadcrumb crumbs={crumbs} />
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start space-x-6 p-4 bg-gray-100 rounded-lg">
                        <div className="flex-1">
                            <CardTitle className="text-xl font-bold text-gray-900">
                                {spreadsheet.name}
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                                {spreadsheet.description}
                            </CardDescription>
                        </div>
                        <div className="p-4 rounded-lg">
                            <p className="text-md font-semibold text-gray-700 mb-1">
                                Oprettet:
                            </p>
                            <PrettyDate
                                dateStr={spreadsheet.created_at}
                                className="text-gray-500 mb-2"
                            />
                            <p className="text-md font-semibold text-gray-700 mb-1">
                                Sidst opdateret:
                            </p>
                            <PrettyDate
                                dateStr={spreadsheet.last_updated_at}
                                className="text-gray-500"
                            />
                        </div>
                    </div>
                </CardHeader>
                <Separator className="mb-5" />
                <CardContent></CardContent>
                <CardFooter>Hej</CardFooter>
            </Card>
        </div>
    );
}
