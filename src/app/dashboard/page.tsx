"use client";
import React from "react";
import CalendarForm from "@/components/ui/CalendarForm";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import MyBreadcrumb from "@/components/client/Breadcrumb";

export default function Home() {
    return (
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <MyBreadcrumb crumbs={crumbs} />
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <CalendarForm />
            </main>
        </div>
    );
}
const crumbs = [
    {
        name: "Dashboard",
        href: "/dashboard",
    },
];
